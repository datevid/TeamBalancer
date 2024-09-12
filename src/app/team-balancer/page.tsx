"use client"

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Moon, Sun, Clipboard } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

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
    const [showBulkInput, setShowBulkInput] = useState<boolean>(false);
    const [bulkNames, setBulkNames] = useState<string>('');
    const [bulkPerformances, setBulkPerformances] = useState<string>('');

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

    const generateRandomPlayers = () => {
        const exampleNames = ['Juan', 'María', 'Pedro', 'Ana', 'Luis', 'Carla', 'Diego', 'Sofía', 'Miguel', 'Laura'];
        const randomPlayers: Player[] = exampleNames.map(name => ({
            name,
            performance: Math.floor(Math.random() * (7 - 4 + 1) + 4) // Genera un número entero entre 4 y 7
        }));
        setPlayers(randomPlayers);
    };

    const balanceTeams = () => {
        const sortedPlayers = [...players].sort((a, b) => b.performance - a.performance);
        const newTeams: Team[] = Array.from({ length: numTeams }, () => ({ players: [], totalPerformance: 0 }));

        sortedPlayers.forEach((player) => {
            // Find the team with the lowest total performance
            const teamToAddTo = newTeams.reduce((minTeam, currentTeam) =>
                currentTeam.totalPerformance < minTeam.totalPerformance ? currentTeam : minTeam
            );

            // Add the player to the team with the lowest total performance
            teamToAddTo.players.push(player);
            teamToAddTo.totalPerformance += player.performance;
        });

        // Round total performances
        newTeams.forEach(team => {
            team.totalPerformance = parseFloat(team.totalPerformance.toFixed(2));
        });

        setTeams(newTeams);
    };

    const toggleBulkInput = () => {
        setShowBulkInput(!showBulkInput);
    };

    const processBulkInput = () => {
        const names = bulkNames.split('\n').filter(name => name.trim() !== '');
        const performances = bulkPerformances.split('\n').filter(perf => perf.trim() !== '');

        const newPlayers = names.map((name, index) => ({
            name: name.trim(),
            performance: parseFloat(performances[index]) || 0
        }));

        setPlayers([...players, ...newPlayers]);
        setBulkNames('');
        setBulkPerformances('');
        setShowBulkInput(false);
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
                <Button onClick={toggleBulkInput}>
                    <Clipboard className="h-4 w-4 mr-2" />
                    Carga Masiva
                </Button>
                <Button onClick={generateRandomPlayers}>Demo</Button>
            </div>

            {showBulkInput && (
                <div className="mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="bulkNames" className="block mb-2 text-sm font-medium">
                                Nombres de jugadores (uno por línea)
                            </label>
                            <Textarea
                                id="bulkNames"
                                placeholder="Juan&#10;María&#10;Pedro"
                                value={bulkNames}
                                onChange={(e) => setBulkNames(e.target.value)}
                                rows={5}
                            />
                        </div>
                        <div>
                            <label htmlFor="bulkPerformances" className="block mb-2 text-sm font-medium">
                                Rendimientos (uno por línea)
                            </label>
                            <Textarea
                                id="bulkPerformances"
                                placeholder="7.5&#10;8.2&#10;6.9"
                                value={bulkPerformances}
                                onChange={(e) => setBulkPerformances(e.target.value)}
                                rows={5}
                            />
                        </div>
                    </div>
                    <Button onClick={processBulkInput} className="mt-2">Procesar Carga Masiva</Button>
                </div>
            )}

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