"use client"

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Moon, Sun } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface Player {
    name: string;
    performance: number;
}

interface Team {
    players: Player[];
    totalPerformance: number;
}

const TeamBalancer: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [newPlayer, setNewPlayer] = useState<Player>({ name: '', performance: 0 });
    const [teams, setTeams] = useState<Team[]>([]);
    const [numTeams, setNumTeams] = useState<number>(2);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const addPlayer = () => {
        if (newPlayer.name && newPlayer.performance) {
            setPlayers([...players, { ...newPlayer, performance: parseFloat(newPlayer.performance.toString()) }]);
            setNewPlayer({ name: '', performance: 0 });
        }
    };

    const removePlayer = (index: number) => {
        setPlayers(players.filter((_, i) => i !== index));
    };

    /*const generateRandomPlayers = () => {
        const randomPlayers: Player[] = Array.from({ length: 10 }, (_, index) => ({
            name: `Jugador ${index + 1}`,
            performance: parseFloat((Math.random() * (7 - 4) + 4).toFixed(1))
        }));
        setPlayers(randomPlayers);
    };*/
    const generateRandomPlayers = () => {
        const exampleNames = ['Juan', 'María', 'Pedro', 'Ana', 'Luis', 'Carla', 'Diego', 'Sofía', 'Miguel', 'Laura'];
        const randomPlayers: Player[] = exampleNames.map(name => ({
            name,
            performance: parseFloat((Math.random() * (7 - 4) + 4).toFixed(1))
        }));
        setPlayers(randomPlayers);
    };

    const balanceTeams = () => {
        const sortedPlayers = [...players].sort((a, b) => b.performance - a.performance);
        const newTeams: Team[] = Array.from({ length: numTeams }, () => ({ players: [], totalPerformance: 0 }));

        sortedPlayers.forEach((player, index) => {
            const teamIndex = index % numTeams;
            newTeams[teamIndex].players.push(player);
            newTeams[teamIndex].totalPerformance += player.performance;
        });

        newTeams.forEach(team => {
            team.totalPerformance = parseFloat(team.totalPerformance.toFixed(2));
        });

        setTeams(newTeams);
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Generador de Equipos Balanceados</h1>
                <div className="flex items-center space-x-2">
                    <Sun className="h-4 w-4" />
                    <Switch
                        checked={isDarkMode}
                        onCheckedChange={setIsDarkMode}
                    />
                    <Moon className="h-4 w-4" />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <Input
                    type="text"
                    placeholder="Nombre del jugador"
                    value={newPlayer.name}
                    onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                />
                <Input
                    type="number"
                    placeholder="Rendimiento (1-10)"
                    value={newPlayer.performance || ''}
                    onChange={(e) => setNewPlayer({ ...newPlayer, performance: parseFloat(e.target.value) || 0 })}
                    min="1"
                    max="10"
                    step="0.1"
                />
                <Button onClick={addPlayer}>Añadir Jugador</Button>
                <Button onClick={generateRandomPlayers}>Demo</Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <Input
                    type="number"
                    placeholder="Número de equipos"
                    value={numTeams}
                    onChange={(e) => setNumTeams(Math.max(2, parseInt(e.target.value) || 2))}
                    min="2"
                    className="w-full sm:w-auto"
                />
                <Button onClick={balanceTeams} disabled={players.length < numTeams}>Generar Equipos</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Jugadores</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul>
                            {players.map((player, index) => (
                                <li key={index} className="flex justify-between items-center mb-2">
                                    <span>{player.name}: {player.performance}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removePlayer(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Equipos Balanceados</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {teams.map((team, index) => (
                                <div key={index}>
                                    <h3 className="font-bold">Equipo {index + 1}</h3>
                                    <p className="text-sm mb-2">Rendimiento total: {team.totalPerformance}</p>
                                    <ul>
                                        {team.players.map((player, playerIndex) => (
                                            <li key={playerIndex}>{player.name}: {player.performance}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default TeamBalancer;