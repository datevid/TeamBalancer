import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function Home() {
    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">Team Balancer</h1>

            <p className="text-center mb-8">
                Easily create balanced teams using player performance scores.
                No bias, just fair and balanced teams.
            </p>

            <Link href="/balancer">
                <Button className="block mx-auto mb-12">Create Teams</Button>
            </Link>

            <h2 className="text-2xl font-semibold text-center mb-8">How It Works</h2>

            <p className="text-center mb-8">
                Simple and easy to use. You can enjoy the Team Balancer without any registration.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">
                            <span className="inline-block w-12 h-12 rounded-full bg-orange-400 text-white text-2xl font-bold leading-12 mb-2">1</span>
                            <br/>Generate
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-center">
                            Start by entering players and their performance scores.
                            Then, choose the number of teams you want to create.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">
                            <span className="inline-block w-12 h-12 rounded-full bg-orange-400 text-white text-2xl font-bold leading-12 mb-2">2</span>
                            <br/>Balance
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-center">
                            Use the balancing function to automatically
                            distribute players into balanced teams.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">
                            <span className="inline-block w-12 h-12 rounded-full bg-orange-400 text-white text-2xl font-bold leading-12 mb-2">3</span>
                            <br/>Review
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-center">
                            Review the generated teams. You can manually adjust
                            if desired or regenerate with different parameters.
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Detailed Process</CardTitle>
                </CardHeader>
                <CardContent>
                    <ol className="list-decimal list-inside space-y-2">
                        <li>Enter player names and their performance scores (1-5).</li>
                        <li>Use the bulk input function to enter multiple players at once if preferred.</li>
                        <li>Specify the number of teams you want to form.</li>
                        <li>Click on Generate Teams to create balanced teams.</li>
                        <li>Review the generated teams and their total scores.</li>
                    </ol>
                </CardContent>
            </Card>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Player Distribution Algorithm</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="mb-4">Our balancing algorithm uses a minimum difference sum approach to create balanced teams:</p>
                    <ol className="list-decimal list-inside space-y-2">
                        <li>Sort players by performance from highest to lowest.</li>
                        <li>Initialize empty teams.</li>
                        <li>For each player, starting with the highest performance:
                            <ul className="list-disc list-inside ml-4 mt-2">
                                <li>Identify the team with the lowest current total performance.</li>
                                <li>Assign the player to that team.</li>
                                <li>Update the teams total performance.</li>
                            </ul>
                        </li>
                        <li>Repeat until all players are assigned.</li>
                    </ol>
                    <p className="mt-4">This method ensures a balanced distribution of players, considering both high and low-performing players.</p>
                </CardContent>
            </Card>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Special Features</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Bulk player input for quick data entry.</li>
                        <li>Clear visualization of formed teams and their total scores.</li>
                        <li>Dark mode for a customizable user experience.</li>
                        <li>Responsive interface that adapts to different screen sizes.</li>
                    </ul>
                </CardContent>
            </Card>

            <p className="text-center mt-8">
                Ready to create balanced teams? Click the Create Teams button and start now!
            </p>

            <Link href="/balancer">
                <Button className="block mx-auto mt-4">Create Teams</Button>
            </Link>

            <footer className="bg-gray-100 py-4 mt-8">
                <div className="text-center text-sm text-gray-600">
                    By <a href="https://twitter.com/datevid" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">@datevid</a>, inspired by ideas from the Tikaz club
                </div>
            </footer>

        </div>
    );
}