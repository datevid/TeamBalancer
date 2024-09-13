"use client"

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Moon, Sun, Clipboard, Star } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link";

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
            setPlayers([...players, { ...newPlayer, performance: parseFloat(newPlayer.performance.toFixed(1)) }]);
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
            performance: parseFloat((Math.random() * 4 + 1).toFixed(1)) // Genera un número entre 1.0 y 5.0
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

    //valida de la carga masiva si el peso del jugador está en el rango de 1-5
    const isValidPerformance = (value: number): boolean => {
        return value >= 1.0 && value <= 5.0 && Number.isFinite(value);
    };

    const processBulkInput = () => {
        const names = bulkNames.split('\n').filter(name => name.trim() !== '');
        const performances = bulkPerformances.split('\n').filter(perf => perf.trim() !== '');

        const newPlayers = names.map((name, index) => {
            const performance = parseFloat(performances[index]);
            return {
                name: name.trim(),
                performance: isValidPerformance(performance) ? performance : 0
            };
        }).filter(player => player.performance !== 0);

        setPlayers([...players, ...newPlayers]);
        setBulkNames('');
        setBulkPerformances('');
        setShowBulkInput(false);

        // Optionally, you can add feedback to the user about invalid entries
        const invalidCount = names.length - newPlayers.length;
        if (invalidCount > 0) {
            alert(`${invalidCount} player(s) were skipped due to invalid performance values. Only values between 1.0 and 5.0 are accepted.`);
        }
    };

    const renderStars = (performance: number) => {
        return Array(5).fill(0).map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < performance ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
        ));
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Generador de Equipos Balanceados</h1>
                <div className="flex items-center space-x-4">
                    <Link href="/balancer" className="text-primary hover:underline">
                        English version
                    </Link>
                    <div className="flex items-center space-x-2">
                        <Sun className="h-4 w-4"/>
                        <Switch
                            checked={isDarkMode}
                            onCheckedChange={setIsDarkMode}
                        />
                        <Moon className="h-4 w-4"/>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <Input
                    type="text"
                    placeholder="Nombre del jugador"
                    value={newPlayer.name}
                    onChange={(e) => setNewPlayer({...newPlayer, name: e.target.value})}
                />
                <Select
                    value={newPlayer.performance.toString()}
                    onValueChange={(value) => setNewPlayer({...newPlayer, performance: parseFloat(value)})}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Rendimiento"/>
                    </SelectTrigger>
                    <SelectContent>
                        {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((value) => (
                            <SelectItem key={value} value={value.toString()}>
                                <div className="flex items-center">
                                    {renderStars(Math.floor(value))}
                                    <span className="ml-2">{value.toFixed(1)}</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button onClick={addPlayer}>Añadir Jugador</Button>
                <Button onClick={toggleBulkInput}>
                    <Clipboard className="h-4 w-4 mr-2"/>
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
                                Rendimientos (uno por línea, 1.0-5.0)
                            </label>
                            <Textarea
                                id="bulkPerformances"
                                placeholder="3.5&#10;4.0&#10;2.5"
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
                                    <span>{player.name}: {player.performance.toFixed(1)}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removePlayer(index)}
                                    >
                                        <Trash2 className="h-4 w-4"/>
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
                                    <p className="text-sm mb-2">Rendimiento
                                        total: {team.totalPerformance.toFixed(1)}</p>
                                    <ul>
                                        {team.players.map((player, playerIndex) => (
                                            <li key={playerIndex}>
                                                {player.name}: {player.performance.toFixed(1)}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <footer className="py-4 mt-8 bg-secondary text-secondary-foreground">
                <div className="text-center text-sm">
                    Por <a href="https://twitter.com/datevid" className="text-primary hover:underline"
                           target="_blank"
                           rel="noopener noreferrer">@datevid</a>, inspirado en ideas aportadas por el club Tikaz
                </div>
            </footer>
        </div>
    );
};

export default TeamBalancer;