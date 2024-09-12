import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function Home() {
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Proceso detallado</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              <li>Ingresa los nombres de los jugadores y sus puntuaciones de rendimiento (1-10).</li>
              <li>Utiliza la función de carga masiva para ingresar múltiples jugadores a la vez si lo prefieres.</li>
              <li>Especifica el número de equipos que deseas formar.</li>
              <li>Haz clic en "Generar Equipos" para crear equipos equilibrados.</li>
              <li>Revisa los equipos generados y sus puntuaciones totales.</li>
            </ol>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Algoritmo de distribución de jugadores</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Nuestro algoritmo de balanceo utiliza un enfoque de "suma de diferencias mínimas" para crear equipos equilibrados:</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Ordena a los jugadores por rendimiento de mayor a menor.</li>
              <li>Inicializa los equipos vacíos.</li>
              <li>Para cada jugador, comenzando por el de mayor rendimiento:
                <ul className="list-disc list-inside ml-4 mt-2">
                  <li>Identifica el equipo con el menor rendimiento total actual.</li>
                  <li>Asigna el jugador a ese equipo.</li>
                  <li>Actualiza el rendimiento total del equipo.</li>
                </ul>
              </li>
              <li>Repite hasta que todos los jugadores estén asignados.</li>
            </ol>
            <p className="mt-4">Este método asegura una distribución equilibrada de jugadores, considerando tanto los jugadores de alto rendimiento como los de bajo rendimiento.</p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Características especiales</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>Carga masiva de jugadores para una entrada rápida de datos.</li>
              <li>Visualización clara de los equipos formados y sus puntuaciones totales.</li>
              <li>Modo oscuro para una experiencia de usuario personalizable.</li>
              <li>Interfaz responsive que se adapta a diferentes tamaños de pantalla.</li>
            </ul>
          </CardContent>
        </Card>

        <p className="text-center mt-8">
          ¿Listo para crear equipos equilibrados? ¡Haz clic en el botón Crear Equipos y comienza ahora!
        </p>

        <Link href="/team-balancer">
          <Button className="block mx-auto mt-4">Crear Equipos</Button>
        </Link>
      </div>
  );
}