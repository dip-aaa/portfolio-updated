"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── Easing helpers ───────────────────────────────────────────
function smoothstep(t: number) {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

/**
 * 3-phase cinematic ease:
 * Phase 1 (0 → 0.42):  Establishing shot — 42% of TIME = only 15% of PATH (barely moves)
 * Phase 2 (0.42 → 0.72): Approach        — 30% of TIME = 40% of PATH (smooth cruise)
 * Phase 3 (0.72 → 1.0):  Zoom            — 28% of TIME = 45% of PATH (accelerates hard)
 */
function cinematicEase(t: number): number {
  if (t < 0.42) {
    return smoothstep(t / 0.42) * 0.15;
  } else if (t < 0.72) {
    return 0.15 + smoothstep((t - 0.42) / 0.30) * 0.40;
  } else {
    const local = (t - 0.72) / 0.28;
    return 0.55 + local * local * 0.45; // quadratic — keeps accelerating into screen
  }
}

// ─── Camera path (CatmullRom spline) ─────────────────────────
const CAM_WAYPOINTS = [
  new THREE.Vector3(2.8,  4.5,  9.0),  // wide establishing shot — high & right
  new THREE.Vector3(2.2,  3.8,  7.5),  // still wide, slight drift
  new THREE.Vector3(1.2,  2.8,  5.5),  // approaching the desk
  new THREE.Vector3(0.3,  2.0,  3.0),  // descending toward monitor
  new THREE.Vector3(0.0,  1.65, 1.2),  // close, nearly level with screen
  new THREE.Vector3(0.0,  1.55, -0.18), // inside the screen — end
];

const TGT_WAYPOINTS = [
  new THREE.Vector3(-1.0, 1.0,  -0.7), // look at girl's workspace (left side)
  new THREE.Vector3(-0.6, 1.1,  -0.5), // shift toward center
  new THREE.Vector3(-0.1, 1.3,  -0.3), // mostly on monitor now
  new THREE.Vector3(0.0,  1.45, -0.25),
  new THREE.Vector3(0.0,  1.55, -0.25),
  new THREE.Vector3(0.0,  1.55, -0.25), // locked on screen center
];

const camCurve = new THREE.CatmullRomCurve3(CAM_WAYPOINTS, false, "catmullrom", 0.4);
const tgtCurve = new THREE.CatmullRomCurve3(TGT_WAYPOINTS, false, "catmullrom", 0.4);

const DURATION = 5.5; // seconds — tightened from 9s; flash fires at ~87% (~4.8s)

// ─── Camera controller ────────────────────────────────────────
function CameraController({ onZoomed }: { onZoomed: () => void }) {
  const { camera } = useThree();
  const progress   = useRef(0);
  const elapsed    = useRef(0);
  const fired      = useRef(false);
  const tmpPos     = useMemo(() => new THREE.Vector3(), []);
  const tmpTgt     = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    elapsed.current  += delta;
    progress.current  = Math.min(progress.current + delta / DURATION, 1);
    const e           = cinematicEase(progress.current);

    camCurve.getPoint(e, tmpPos);
    tgtCurve.getPoint(e, tmpTgt);

    // Gentle handheld sway during establishing shot only
    if (progress.current < 0.44) {
      const sway = 1 - progress.current / 0.44; // fade out as we start moving
      tmpPos.x += Math.sin(elapsed.current * 0.32) * 0.055 * sway;
      tmpPos.y += Math.sin(elapsed.current * 0.22) * 0.028 * sway;
    }

    camera.position.copy(tmpPos);
    camera.lookAt(tmpTgt);

    // Fire transition at 87% progress (~7.8 s)
    if (progress.current >= 0.87 && !fired.current) {
      fired.current = true;
      onZoomed();
    }
  });
  return null;
}

// ─── Monitor screen canvas texture ───────────────────────────
function makeScreenTexture() {
  if (typeof document === "undefined") return new THREE.Texture();
  const c   = document.createElement("canvas");
  c.width   = 512;
  c.height  = 300;
  const ctx = c.getContext("2d")!;

  ctx.fillStyle = "#000d1c";
  ctx.fillRect(0, 0, 512, 300);

  // Grid
  ctx.strokeStyle = "rgba(0,200,255,0.05)";
  ctx.lineWidth = 1;
  for (let x = 0; x < 512; x += 28) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 300); ctx.stroke(); }
  for (let y = 0; y < 300; y += 28) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(512, y); ctx.stroke(); }

  // Scanlines
  for (let y = 0; y < 300; y += 3) {
    ctx.fillStyle = "rgba(0,0,0,0.15)";
    ctx.fillRect(0, y, 512, 1);
  }

  // Glow halo
  const g = ctx.createRadialGradient(256, 120, 10, 256, 120, 170);
  g.addColorStop(0, "rgba(0,200,255,0.22)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 512, 300);

  // "Dipa" text
  ctx.shadowColor = "#00ddff";
  ctx.shadowBlur  = 28;
  ctx.fillStyle   = "#e0f8ff";
  ctx.font        = "bold 68px 'Courier New', monospace";
  ctx.textAlign   = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Dipa", 256, 110);

  ctx.shadowBlur = 14;
  ctx.fillStyle  = "#00aacc";
  ctx.font       = "16px 'Courier New', monospace";
  ctx.fillText("Developer  ·  Designer", 256, 162);

  ctx.shadowBlur = 0;
  ctx.font       = "11px 'Courier New', monospace";
  const lines = ["> Initializing workspace...", "> Loading portfolio assets...", "> Ready ✓"];
  const clrs  = ["rgba(0,255,136,0.6)", "rgba(0,200,255,0.5)", "rgba(180,255,220,0.7)"];
  lines.forEach((l, i) => {
    ctx.fillStyle = clrs[i];
    ctx.textAlign = "left";
    ctx.fillText(l, 30, 208 + i * 18);
  });

  ctx.fillStyle = "#00ffcc";
  ctx.fillRect(30, 262, 8, 13);

  return new THREE.CanvasTexture(c);
}

// ─── Room ────────────────────────────────────────────────────
function Room() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial color="#070710" roughness={0.95} metalness={0.1} />
      </mesh>
      {/* Back wall */}
      <mesh position={[0, 5, -5]} receiveShadow>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#09091a" roughness={1} />
      </mesh>
      {/* Left wall */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-7, 5, -1]} receiveShadow>
        <planeGeometry args={[12, 10]} />
        <meshStandardMaterial color="#080814" roughness={1} />
      </mesh>
      {/* Right wall */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[7, 5, -1]} receiveShadow>
        <planeGeometry args={[12, 10]} />
        <meshStandardMaterial color="#080814" roughness={1} />
      </mesh>
      {/* Floor glow reflection under monitor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, -0.6]} receiveShadow>
        <planeGeometry args={[5, 3.5]} />
        <meshStandardMaterial color="#080a1c" roughness={0.25} metalness={0.5} transparent opacity={0.5} />
      </mesh>
      {/* Subtle shelf / wall poster left */}
      <mesh position={[-2.8, 2.8, -4.95]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.8, 1.1]} />
        <meshStandardMaterial color="#0a0a22" roughness={1} emissive="#0a0a22" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

// ─── Desk ────────────────────────────────────────────────────
function Desk() {
  const woodDark = "#130c07";
  return (
    <group>
      {/* Surface */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.6, 0.07, 1.5]} />
        <meshStandardMaterial color={woodDark} roughness={0.72} metalness={0.04} />
      </mesh>
      {/* Front lip */}
      <mesh position={[0, 0.685, 0.745]}>
        <boxGeometry args={[3.6, 0.07, 0.04]} />
        <meshStandardMaterial color={woodDark} roughness={0.72} />
      </mesh>
      {/* Legs */}
      {([ [-1.65, -0.35], [1.65, -0.35], [-1.65, 0.35], [1.65, 0.35] ] as [number,number][]).map(([x, z], i) => (
        <mesh key={i} position={[x, 0.375, z]}>
          <boxGeometry args={[0.07, 0.75, 0.07]} />
          <meshStandardMaterial color="#100c06" roughness={0.82} />
        </mesh>
      ))}
      {/* Cable on front edge */}
      <mesh position={[-0.3, 0.79, 0.65]} rotation={[0, 0.5, 0]}>
        <torusGeometry args={[0.06, 0.014, 6, 16, Math.PI * 1.3]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
    </group>
  );
}

// ─── Monitor ─────────────────────────────────────────────────
function Monitor() {
  const screenTex = useMemo(() => makeScreenTexture(), []);
  const screenRef = useRef<THREE.MeshBasicMaterial>(null);
  const flickerT  = useRef(0);

  useFrame((_, delta) => {
    flickerT.current += delta;
    if (screenRef.current) {
      screenRef.current.opacity = 0.97 + Math.sin(flickerT.current * 7.1) * 0.013;
    }
  });

  // Monitor slightly right of center (girl is left, monitor is center-right)
  return (
    <group position={[0.25, 0, -0.3]}>
      {/* Base */}
      <mesh position={[0, 0.795, 0]}>
        <boxGeometry args={[0.55, 0.055, 0.4]} />
        <meshStandardMaterial color="#111111" roughness={0.4} metalness={0.65} />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 0.98, 0]}>
        <boxGeometry args={[0.055, 0.37, 0.055]} />
        <meshStandardMaterial color="#0e0e0e" roughness={0.3} metalness={0.75} />
      </mesh>
      {/* Body (bezel) */}
      <mesh position={[0, 1.55, 0]}>
        <boxGeometry args={[1.95, 1.2, 0.09]} />
        <meshStandardMaterial color="#0c0c0c" roughness={0.2} metalness={0.72} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 1.55, 0.048]}>
        <planeGeometry args={[1.8, 1.1]} />
        <meshBasicMaterial ref={screenRef} map={screenTex} transparent />
      </mesh>
      {/* Screen inner glow layer */}
      <mesh position={[0, 1.55, 0.049]}>
        <planeGeometry args={[1.8, 1.1]} />
        <meshBasicMaterial color="#001830" transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

// ─── Keyboard ────────────────────────────────────────────────
// Positioned between girl and monitor
function Keyboard() {
  const lightRef = useRef<THREE.PointLight>(null);
  const timeRef  = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta * 0.75;
    if (lightRef.current) {
      const t = timeRef.current;
      lightRef.current.color.setRGB(
        Math.sin(t * 1.1) * 0.5 + 0.5,
        Math.sin(t * 0.65 + 2.1) * 0.3,
        Math.sin(t * 0.45 + 4.2) * 0.7 + 0.3,
      );
      lightRef.current.intensity = 0.9 + Math.sin(t * 2.0) * 0.35;
    }
  });

  return (
    <group position={[-0.35, 0, 0.15]}>
      <mesh position={[0, 0.79, 0]}>
        <boxGeometry args={[1.1, 0.03, 0.44]} />
        <meshStandardMaterial color="#0c0c14" roughness={0.4} metalness={0.3} />
      </mesh>
      {[0, 1, 2, 3].map((row) => (
        <mesh key={row} position={[0, 0.808, -0.14 + row * 0.095]}>
          <boxGeometry args={[1.03, 0.005, 0.065]} />
          <meshStandardMaterial color="#111118" roughness={0.5} />
        </mesh>
      ))}
      <pointLight ref={lightRef} position={[0, 0.77, 0]} distance={2.0} decay={2} />
      {/* Mouse */}
      <mesh position={[0.76, 0.795, 0.02]}>
        <boxGeometry args={[0.13, 0.025, 0.21]} />
        <meshStandardMaterial color="#0c0c14" roughness={0.4} metalness={0.3} />
      </mesh>
    </group>
  );
}

// ─── Accessories ─────────────────────────────────────────────
function Accessories() {
  return (
    <group>
      {/* Coffee mug — left side near girl */}
      <group position={[-1.1, 0, -0.42]}>
        <mesh position={[0, 0.93, 0]}>
          <cylinderGeometry args={[0.065, 0.055, 0.145, 16]} />
          <meshStandardMaterial color="#111118" roughness={0.7} metalness={0.2} />
        </mesh>
        <mesh position={[0.082, 0.93, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.038, 0.013, 6, 12, Math.PI]} />
          <meshStandardMaterial color="#111118" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.998, 0]}>
          <cylinderGeometry args={[0.056, 0.056, 0.01, 16]} />
          <meshStandardMaterial color="#1a0800" roughness={0.1} />
        </mesh>
        {[-0.018, 0.008, -0.005].map((ox, i) => (
          <mesh key={i} position={[ox, 1.04 + i * 0.04, 0]}>
            <sphereGeometry args={[0.011, 6, 6]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.065 - i * 0.016} />
          </mesh>
        ))}
      </group>

      {/* Plant — right side of desk */}
      <group position={[1.2, 0, -0.44]}>
        <mesh position={[0, 0.84, 0]}>
          <cylinderGeometry args={[0.07, 0.055, 0.145, 12]} />
          <meshStandardMaterial color="#1c0808" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.925, 0]}>
          <sphereGeometry args={[0.1, 10, 10]} />
          <meshStandardMaterial color="#0b1e08" roughness={0.9} />
        </mesh>
        {[0, 1.3, 2.6, 3.9].map((angle, i) => (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * 0.085,
              0.975 + i * 0.016,
              Math.sin(angle) * 0.085,
            ]}
            rotation={[0.45, angle, 0]}
          >
            <planeGeometry args={[0.075, 0.13]} />
            <meshStandardMaterial color="#0e2c08" roughness={0.9} side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>

      {/* Notebook */}
      <mesh position={[1.12, 0.79, -0.18]} rotation={[0, 0.22, 0]}>
        <boxGeometry args={[0.23, 0.016, 0.32]} />
        <meshStandardMaterial color="#1a1a2c" roughness={0.8} />
      </mesh>
      <mesh position={[1.12, 0.8, -0.18]} rotation={[0, 0.22, 0]}>
        <boxGeometry args={[0.21, 0.002, 0.3]} />
        <meshStandardMaterial color="#0d0d1a" roughness={0.9} />
      </mesh>

      {/* Desk lamp — far left */}
      <group position={[-1.55, 0, -0.52]}>
        <mesh position={[0, 0.84, 0]}>
          <cylinderGeometry args={[0.04, 0.06, 0.18, 8]} />
          <meshStandardMaterial color="#0c0c14" roughness={0.4} metalness={0.6} />
        </mesh>
        <mesh position={[0, 1.25, 0]} rotation={[0, 0, 0.28]}>
          <cylinderGeometry args={[0.018, 0.018, 0.82, 8]} />
          <meshStandardMaterial color="#0c0c14" roughness={0.4} metalness={0.6} />
        </mesh>
        <mesh position={[0.22, 1.62, 0]} rotation={[0, 0, -0.5]}>
          <coneGeometry args={[0.1, 0.2, 12, 1, true]} />
          <meshStandardMaterial color="#111120" roughness={0.4} metalness={0.5} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Headphones hanging on monitor stand */}
      <group position={[0.75, 0, -0.32]}>
        <mesh position={[0, 1.17, 0]}>
          <torusGeometry args={[0.1, 0.02, 8, 16, Math.PI * 1.2]} />
          <meshStandardMaterial color="#0c0c14" roughness={0.5} metalness={0.4} />
        </mesh>
        <mesh position={[-0.1, 1.07, 0]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.06, 0.08, 0.04]} />
          <meshStandardMaterial color="#0c0c14" roughness={0.5} metalness={0.4} />
        </mesh>
        <mesh position={[0.1, 1.07, 0]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.06, 0.08, 0.04]} />
          <meshStandardMaterial color="#0c0c14" roughness={0.5} metalness={0.4} />
        </mesh>
      </group>
    </group>
  );
}

// ─── Floating particles ───────────────────────────────────────
function Particles() {
  const count   = typeof window !== "undefined" && window.innerWidth < 768 ? 60 : 200;
  const posArr  = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = Math.random() * 5.5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    return arr;
  }, []);
  const speedArr = useMemo(
    () => Float32Array.from({ length: count }, () => 0.025 + Math.random() * 0.055),
    []
  );
  const geomRef = useRef<THREE.BufferGeometry>(null);

  useFrame((_, delta) => {
    if (!geomRef.current) return;
    const pos = geomRef.current.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += speedArr[i] * delta;
      if (pos[i * 3 + 1] > 5.5) pos[i * 3 + 1] = 0.05;
    }
    geomRef.current.attributes.position.needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry ref={geomRef}>
        <bufferAttribute attach="attributes-position" args={[posArr, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial color="#44aaff" size={0.02} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

// ─── Lights ──────────────────────────────────────────────────
function Lights() {
  const monitorRef = useRef<THREE.PointLight>(null);
  const timeRef    = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (monitorRef.current) {
      monitorRef.current.intensity = 2.6 + Math.sin(timeRef.current * 4.2) * 0.22;
    }
  });

  return (
    <>
      {/* Ambient — slightly raised so dark geometry is never pure black */}
      <ambientLight intensity={0.18} color="#0d0d2a" />

      {/* Monitor glow — main cyan fill */}
      <pointLight
        ref={monitorRef}
        position={[0.25, 1.55, -0.16]}
        color="#00ccff"
        intensity={3.0}
        distance={7}
        decay={2}
      />

      {/* Monitor secondary bounce — washes forward onto desk/girl arms */}
      <pointLight position={[0.25, 0.9, 0.5]} color="#006699" intensity={0.8} distance={4} decay={2} />

      {/* Cool directional rim */}
      <directionalLight position={[6, 5, 4]} color="#3355bb" intensity={0.5} />

      {/* Floor bounce under monitor */}
      <pointLight position={[0.25, 0.08, -0.3]} color="#001133" intensity={0.3} distance={3.5} decay={2} />
    </>
  );
}

// ─── Canvas export ────────────────────────────────────────────
export default function CinematicCanvas({ onZoomed }: { onZoomed: () => void }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  return (
    <Canvas
      camera={{ position: [2.8, 4.5, 9.0], fov: 52 }}
      shadows={false}
      gl={{ antialias: !isMobile, alpha: false, powerPreference: "high-performance" }}
      dpr={isMobile ? [1, 1] : [1, 1.5]}
      style={{ background: "#030712" }}
    >
      <Lights />
      <Room />
      <Desk />
      <Monitor />
      <Keyboard />
      <Accessories />
      <Particles />
      <CameraController onZoomed={onZoomed} />
    </Canvas>
  );
}
