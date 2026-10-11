import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ArrowRight, Compass, Laptop, ShoppingBag, MessageSquare, RotateCcw } from 'lucide-react';
import { DemoId } from '../types';
import { GENERATED_IMAGES, ResilientImage } from './ResilientImage';

interface HeroScene3DProps {
  onOpenConsultation: (defaultService?: string) => void;
  onExploreWork: (demoId?: DemoId) => void;
}

export const HeroScene3D: React.FC<HeroScene3DProps> = ({
  onOpenConsultation,
  onExploreWork
}) => {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [webglReady, setWebglReady] = useState(true);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [focusedDevice, setFocusedDevice] = useState<'all' | 'laptop' | 'store' | 'phone'>('all');

  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let renderer: THREE.WebGLRenderer | null = null;

    try {
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x060711, 0.065);

      const width = container.clientWidth || 640;
      const height = container.clientHeight || 560;

      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 0.4, 7.2);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;

      const canvas = renderer.domElement;
      const handleContextLost = (e: Event) => {
        e.preventDefault();
        setWebglReady(false);
      };
      const handleContextRestored = () => {
        setWebglReady(true);
      };
      canvas.addEventListener('webglcontextlost', handleContextLost, false);
      canvas.addEventListener('webglcontextrestored', handleContextRestored, false);

      container.innerHTML = '';
      container.appendChild(canvas);

      // Three-Point Studio Lighting (Key, Fill, Electric Violet Rim)
      const ambientLight = new THREE.AmbientLight(0x1e1b4b, 1.6);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xf5f3ff, 2.4);
      keyLight.position.set(4, 6, 5);
      scene.add(keyLight);

      const fillLight = new THREE.PointLight(0x3b82f6, 2.2, 18);
      fillLight.position.set(-5, -2, 3);
      scene.add(fillLight);

      const rimLight = new THREE.PointLight(0x8b5cf6, 4.5, 20);
      rimLight.position.set(0, 3, -3);
      scene.add(rimLight);

      // Main 3D group that responds to mouse parallax
      const rootGroup = new THREE.Group();
      scene.add(rootGroup);

      // Orbital ring representing automated digital ecosystems
      const ringGeo = new THREE.TorusGeometry(2.65, 0.018, 24, 120);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0x8b5cf6,
        emissive: 0x6d28d9,
        emissiveIntensity: 0.7,
        roughness: 0.2,
        metalness: 0.8
      });
      const orbitalRing = new THREE.Mesh(ringGeo, ringMat);
      orbitalRing.rotation.x = Math.PI / 2.6;
      orbitalRing.rotation.y = -0.25;
      rootGroup.add(orbitalRing);

      // Secondary tilted ring
      const innerRingGeo = new THREE.TorusGeometry(1.9, 0.012, 16, 100);
      const innerRingMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.5,
        roughness: 0.3,
        metalness: 0.7
      });
      const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
      innerRing.rotation.x = -Math.PI / 3;
      innerRing.rotation.z = 0.4;
      rootGroup.add(innerRing);

      // Floating 3D Glass Panels & Geometric Nodes
      const panelGeo = new THREE.BoxGeometry(1.2, 0.75, 0.04);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0x1e1b4b,
        emissive: 0x4c1d95,
        emissiveIntensity: 0.2,
        roughness: 0.15,
        metalness: 0.2,
        transmission: 0.6,
        transparent: true,
        opacity: 0.65
      });

      const floatingPanel1 = new THREE.Mesh(panelGeo, glassMat);
      floatingPanel1.position.set(-2.5, 1.5, -1.2);
      floatingPanel1.rotation.set(0.2, 0.4, -0.1);
      rootGroup.add(floatingPanel1);

      const floatingPanel2 = new THREE.Mesh(panelGeo, glassMat);
      floatingPanel2.position.set(2.6, -1.4, -1.0);
      floatingPanel2.rotation.set(-0.15, -0.35, 0.1);
      rootGroup.add(floatingPanel2);

      // Faceted 3D Octahedron Crystal Node (Top Right)
      const crystalGeo = new THREE.OctahedronGeometry(0.42, 0);
      const crystalMat = new THREE.MeshStandardMaterial({
        color: 0xa78bfa,
        emissive: 0x5b21b6,
        emissiveIntensity: 0.4,
        roughness: 0.18,
        metalness: 0.85,
        wireframe: false
      });
      const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
      crystalMesh.position.set(2.3, 1.65, -0.4);
      rootGroup.add(crystalMesh);

      // Wireframe Icosahedron Node (Bottom Left)
      const icoGeo = new THREE.IcosahedronGeometry(0.48, 0);
      const icoMat = new THREE.MeshStandardMaterial({
        color: 0x60a5fa,
        emissive: 0x1d4ed8,
        emissiveIntensity: 0.5,
        wireframe: true
      });
      const icoMesh = new THREE.Mesh(icoGeo, icoMat);
      icoMesh.position.set(-2.35, -1.35, -0.3);
      rootGroup.add(icoMesh);

      // Subtle starfield / spatial nodes
      const particlesCount = 90;
      const positions = new Float32Array(particlesCount * 3);
      for (let i = 0; i < particlesCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 5 - 1.5;
      }
      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const particleMat = new THREE.PointsMaterial({
        color: 0xc4b5fd,
        size: 0.045,
        transparent: true,
        opacity: 0.65
      });
      const particleSystem = new THREE.Points(particleGeo, particleMat);
      rootGroup.add(particleSystem);

      let targetX = 0;
      let targetY = 0;

      const handlePointerMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        targetX = Math.max(-1, Math.min(1, normX));
        targetY = Math.max(-1, Math.min(1, normY));
      };

      window.addEventListener('mousemove', handlePointerMove, { passive: true });

      const handleResize = () => {
        if (!container || !renderer) return;
        const newW = container.clientWidth || 640;
        const newH = container.clientHeight || 560;
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      };
      window.addEventListener('resize', handleResize);

      const clock = new THREE.Clock();
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        orbitalRing.rotation.z = elapsed * 0.14;
        innerRing.rotation.y = -elapsed * 0.18;

        crystalMesh.rotation.x = elapsed * 0.45;
        crystalMesh.rotation.y = elapsed * 0.6;
        crystalMesh.position.y = 1.65 + Math.sin(elapsed * 1.5) * 0.12;

        icoMesh.rotation.x = -elapsed * 0.35;
        icoMesh.rotation.y = elapsed * 0.4;
        icoMesh.position.y = -1.35 + Math.cos(elapsed * 1.3) * 0.12;

        floatingPanel1.position.y = 1.5 + Math.sin(elapsed * 1.1) * 0.1;
        floatingPanel2.position.y = -1.4 + Math.cos(elapsed * 1.2) * 0.1;

        // Smooth camera & group damping
        rootGroup.rotation.y += (targetX * 0.32 - rootGroup.rotation.y) * 0.06;
        rootGroup.rotation.x += (targetY * 0.2 - rootGroup.rotation.x) * 0.06;

        renderer?.render(scene, camera);
      };
      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('mousemove', handlePointerMove);
        window.removeEventListener('resize', handleResize);
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        canvas.removeEventListener('webglcontextrestored', handleContextRestored);
        renderer?.dispose();
      };
    } catch {
      setWebglReady(false);
    }
  }, []);

  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    setTilt({ x, y });
  };

  const handleStageMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-4.5rem)] flex flex-col justify-between pt-8 pb-16 lg:py-16 overflow-hidden border-b border-white/10"
    >
      {/* Ambient Radial Lighting Backdrops */}
      <div
        className="pointer-events-none absolute -top-40 left-1/4 w-[620px] h-[620px] rounded-full bg-violet-600/15 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 right-10 w-[520px] h-[520px] rounded-full bg-indigo-600/15 blur-[130px]"
        aria-hidden="true"
      />

      <div className="max-w-[1280px] mx-auto w-full px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Semantic Proposition & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <p className="text-xs font-medium tracking-wider text-violet-300 mb-4">
              NovaAI Digital Agency · Build · Automate · Grow
            </p>

            <h1
              className="font-display font-bold tracking-tight text-white leading-[1.08] mb-6"
              style={{
                fontSize: 'clamp(2.35rem, 4.2vw, 3.75rem)',
                textWrap: 'balance'
              }}
            >
              Your Business Deserves a Digital Upgrade.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-[60ch] mb-8 font-normal">
              We build stunning websites, powerful Shopify stores, and smart WhatsApp chatbots that help businesses attract customers, automate inquiries, and grow online.
            </p>

            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <button
                type="button"
                onClick={() => onOpenConsultation('Full Digital Upgrade Bundle')}
                className="px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-all duration-150 shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2.5 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
              >
                <span>Get Your Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onExploreWork()}
                className="px-6 py-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-slate-100 font-semibold text-sm transition-all duration-150 flex items-center justify-center gap-2.5 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
              >
                <Compass className="w-4 h-4 text-violet-300" />
                <span>Explore Our Work</span>
              </button>
            </div>

            {/* Unboxed Metadata Discipline: Who We Serve */}
            <div className="pt-6 border-t border-white/10 w-full">
              <p className="text-xs text-slate-400 mb-2">
                Engineered for high-converting customer experiences across industries:
              </p>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-medium text-slate-300">
                <span>Restaurants & Fine Dining</span>
                <span aria-hidden="true" className="text-violet-400">·</span>
                <span>Specialty Cafés</span>
                <span aria-hidden="true" className="text-violet-400">·</span>
                <span>E-Commerce & D2C Brands</span>
                <span aria-hidden="true" className="text-violet-400">·</span>
                <span>Salons & Studios</span>
                <span aria-hidden="true" className="text-violet-400">·</span>
                <span>Real Estate Agencies</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Showcase Stage */}
          <div
            ref={stageRef}
            onMouseMove={handleStageMouseMove}
            onMouseLeave={handleStageMouseLeave}
            className="lg:col-span-6 relative h-[520px] sm:h-[560px] w-full perspective-stage select-none"
          >
            {/* Three.js WebGL 3D Spatial Canvas Layer */}
            <div
              ref={canvasContainerRef}
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              aria-hidden="true"
            />
            {!webglReady && (
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-950/30 via-[#0B0E23] to-[#060711] border border-white/10"
                aria-hidden="true"
              />
            )}

            {/* 3D Interactive Device Rig */}
            <div
              className="relative z-10 w-full h-full flex items-center justify-center preserve-3d transition-transform duration-150 ease-out"
              style={{
                transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`
              }}
            >
              {/* 1. Central 3D Laptop Displaying FineDine Restaurant Website */}
              <div
                onClick={() => onExploreWork('finedine')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onExploreWork('finedine')}
                aria-label="Inspect FineDine Restaurant Website Demo"
                className={`group cursor-pointer transition-all duration-200 rounded-2xl bg-[#0D1026]/90 backdrop-blur-xl border ${
                  focusedDevice === 'laptop'
                    ? 'border-violet-400 shadow-2xl shadow-violet-600/30 scale-105 z-30'
                    : 'border-white/15 hover:border-violet-400/60 shadow-2xl shadow-black/80 z-20'
                } w-[310px] sm:w-[390px] overflow-hidden`}
                style={{
                  transform:
                    focusedDevice === 'laptop'
                      ? 'translate3d(0px, -10px, 50px)'
                      : 'translate3d(-18px, -12px, 20px) rotateY(-8deg) rotateX(4deg)'
                }}
              >
                {/* Laptop Top Bezel */}
                <div className="px-3.5 py-2 bg-[#080A18] border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-white/20" />
                    <span className="w-2 h-2 rounded-full bg-white/20" />
                    <span className="w-2 h-2 rounded-full bg-white/20" />
                  </div>
                  <span className="text-[11px] font-mono-tabular text-slate-400 truncate">
                    finedine-sample.novaai.studio
                  </span>
                  <span className="text-[10px] text-violet-300 font-medium">
                    Sample Demo
                  </span>
                </div>

                {/* Laptop Screen Content: FineDine Restaurant */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden">
                  <ResilientImage
                    src={GENERATED_IMAGES.finedineWagyu}
                    alt="FineDine seared Wagyu tenderloin plated with black truffle jus"
                    fallbackCategory="restaurant"
                    fallbackTitle="FineDine Culinary Showcase"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080A18] via-[#080A18]/50 to-transparent" />
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-end justify-between gap-2">
                    <div>
                      <p className="text-[11px] text-amber-300/90 font-medium">
                        FineDine · Modern Gastronomy
                      </p>
                      <h2 className="text-sm sm:text-base font-display font-bold text-white leading-tight">
                        A5 Wagyu & Truffle Tasting Menu
                      </h2>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        Digital Menu · Table Inquiry · WhatsApp Order
                      </p>
                    </div>
                    <span className="px-2.5 py-1.5 rounded-lg bg-violet-600/90 text-white text-[11px] font-medium whitespace-nowrap shrink-0">
                      Open Demo
                    </span>
                  </div>
                </div>

                {/* Laptop Keyboard Deck Base Illusion */}
                <div className="h-3 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 border-t border-white/15 flex items-center justify-center">
                  <div className="w-16 h-1 rounded-full bg-white/20" />
                </div>
              </div>

              {/* 2. Floating E-Commerce Storefront Glass Card (Top Right) */}
              <div
                onClick={() => onExploreWork('glowskin')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onExploreWork('glowskin')}
                aria-label="Inspect GlowSkin Shopify Store Demo"
                className={`group cursor-pointer transition-all duration-200 absolute top-4 right-0 sm:right-2 w-[210px] sm:w-[235px] rounded-xl bg-[#111530]/85 backdrop-blur-xl border ${
                  focusedDevice === 'store'
                    ? 'border-violet-400 shadow-2xl shadow-violet-600/30 scale-105 z-30'
                    : 'border-white/15 hover:border-violet-400/60 shadow-xl shadow-black/70 z-25'
                } p-3`}
                style={{
                  transform:
                    focusedDevice === 'store'
                      ? 'translate3d(-10px, 10px, 65px)'
                      : 'translate3d(10px, -8px, 45px) rotateY(-12deg) rotateX(6deg)'
                }}
              >
                <div className="flex items-center justify-between text-[11px] text-slate-300 mb-2">
                  <span className="font-semibold text-white">GlowSkin Store</span>
                  <span className="font-mono-tabular text-violet-300">Shopify Demo</span>
                </div>
                <div className="h-28 w-full rounded-lg overflow-hidden mb-2.5 relative bg-[#090B1A]">
                  <ResilientImage
                    src={GENERATED_IMAGES.glowskinSerum}
                    alt="GlowSkin Botanical Renewal Facial Serum Bottle"
                    fallbackCategory="skincare"
                    fallbackTitle="Botanical Serum"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-white leading-snug">
                      Plum & Amethyst Serum
                    </p>
                    <p className="text-[11px] font-mono-tabular text-slate-300">
                      $68.00 · 30ml
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-white/10 group-hover:bg-violet-600 text-white text-[11px] font-medium transition-colors whitespace-nowrap shrink-0">
                    Try Cart
                  </span>
                </div>
              </div>

              {/* 3. Floating Smartphone with WhatsApp Chatbot Conversation (Bottom Left/Right) */}
              <div
                onClick={() => onExploreWork('whatsapp-bot')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onExploreWork('whatsapp-bot')}
                aria-label="Inspect Smart WhatsApp Assistant Demo"
                className={`group cursor-pointer transition-all duration-200 absolute bottom-2 left-2 sm:left-4 w-[235px] sm:w-[255px] rounded-2xl bg-[#0E1329]/90 backdrop-blur-xl border ${
                  focusedDevice === 'phone'
                    ? 'border-violet-400 shadow-2xl shadow-violet-600/30 scale-105 z-30'
                    : 'border-white/15 hover:border-violet-400/60 shadow-xl shadow-black/80 z-30'
                } p-3.5`}
                style={{
                  transform:
                    focusedDevice === 'phone'
                      ? 'translate3d(20px, -10px, 70px)'
                      : 'translate3d(-6px, 8px, 55px) rotateY(10deg) rotateX(-4deg)'
                }}
              >
                <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                      <MessageSquare className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white leading-none">
                        Smart WhatsApp Bot
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Automated Inquiry Flow
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono-tabular text-violet-300">
                    24/7 Auto
                  </span>
                </div>

                <div className="space-y-2 text-[11px]">
                  <div className="bg-white/[0.06] rounded-lg px-2.5 py-1.5 text-slate-200 max-w-[90%]">
                    Hi! Do you have a table for 4 tonight at 8:00 PM?
                  </div>
                  <div className="bg-violet-600/25 border border-violet-400/30 rounded-lg px-2.5 py-1.5 text-slate-100 ml-auto max-w-[94%]">
                    Yes! 8:00 PM is available. Would you like to view the tasting menu or confirm your reservation?
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-violet-300 font-medium">
                  <span>Test interactive bot</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>

            {/* Floating HUD Controls for 3D Stage Inspection */}
            <div className="absolute bottom-2 right-2 z-30 flex items-center gap-1 p-1 rounded-xl bg-[#090B1A]/85 backdrop-blur-md border border-white/10">
              <button
                type="button"
                onClick={() => setFocusedDevice('all')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  focusedDevice === 'all'
                    ? 'bg-violet-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <RotateCcw className="w-3 h-3 inline mr-1" />
                3D Stage
              </button>
              <button
                type="button"
                onClick={() => setFocusedDevice('laptop')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  focusedDevice === 'laptop'
                    ? 'bg-violet-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Laptop className="w-3 h-3 inline mr-1" />
                Restaurant
              </button>
              <button
                type="button"
                onClick={() => setFocusedDevice('store')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  focusedDevice === 'store'
                    ? 'bg-violet-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ShoppingBag className="w-3 h-3 inline mr-1" />
                Shopify
              </button>
              <button
                type="button"
                onClick={() => setFocusedDevice('phone')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  focusedDevice === 'phone'
                    ? 'bg-violet-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-3 h-3 inline mr-1" />
                Chatbot
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
