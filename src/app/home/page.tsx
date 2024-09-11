import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

const HomePage: React.FC = () =>
{
    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">Balanceador de Equipos</h1>

            <p className="text-center mb-8">
                Crea equipos equilibrados fácilmente utilizando el rendimiento de los jugadores.
                Sin sesgo, solo equipos justos y balanceados.
            </p>

            <Link href="/team-balancer">
                <Button className="block mx-auto mb-12">Crear Equipos</Button>
            </Link>

            <h2 className="text-2xl font-semibold text-center mb-8">¿Cómo funciona?</h2>

            <p className="text-center mb-8">
                Simple y fácil de usar. Puedes disfrutar del Balanceador de Equipos sin necesidad de registro.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">
                            <span className="inline-block w-12 h-12 rounded-full bg-orange-400 text-white text-2xl font-bold leading-12 mb-2">1</span>
                            <br />Generar
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-center">
                            Comienza ingresando los jugadores y sus rendimientos.
                            Luego, elige el número de equipos que deseas crear.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">
                            <span className="inline-block w-12 h-12 rounded-full bg-orange-400 text-white text-2xl font-bold leading-12 mb-2">2</span>
                            <br />Balancear
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-center">
                            Utiliza la función de balanceo para distribuir
                            automáticamente a los jugadores en equipos equilibrados.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">
                            <span className="inline-block w-12 h-12 rounded-full bg-orange-400 text-white text-2xl font-bold leading-12 mb-2">3</span>
                            <br />Revisar
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-center">
                            Revisa los equipos generados. Puedes ajustar manualmente
                            si lo deseas o volver a generar con diferentes parámetros.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default HomePage;