'use client'

import Image from "next/image";
import { Button, ButtonVariant, ButtonSize, ButtonRounded } from "@/app/components/ui/button/Button";

export default function Hero() {
    return (
        <section
            id="inicio"
            className="relative overflow-hidden text-amber-400 pt-32"
        >
            <div className="mx-auto flex min-h-screen max-w-[1800px] flex-col justify-between px-6 lg:px-12">
                {/* Texto */}
                <div className="z-10 flex flex-col">
                    <p className="mb-4 font-body text-lg uppercase tracking-[0.3em] ">
                        Ensenada, B.C.
                    </p>

                    <h1 className="font-heading uppercase leading-[0.82]">
                        <span className="block text-[clamp(5rem,14vw,13rem)]">
                            Taquería
                        </span>

                        <span className="block text-[clamp(7rem,20vw,18rem)] text-green-700">
                            777
                        </span>
                    </h1>

                    <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                        <p className="max-w-xl text-xl leading-relaxed ">
                            Tacos preparados al momento con ingredientes frescos y el sabor
                            que ha acompañado a Ensenada por años.
                        </p>

                        <Button label="Ordenar en Didi"
                            variant={ButtonVariant.Didi}
                            size={ButtonSize.XXXLarge}
                            rounded={ButtonRounded.Full}
                            onClick={() => {
                                console.log("Ordenar en Didi clicked");
                            }} />
                    </div>
                </div>

                {/* Imagen */}
                <div className="relative mt-10 h-[55vh] w-full lg:h-[65vh]">
                    <Image
                        src="/tacos.png"
                        alt="Tacos de Taquería 777"
                        fill
                        priority
                        className="object-cover object-center"
                    />
                </div>
            </div>
        </section>
    );
}