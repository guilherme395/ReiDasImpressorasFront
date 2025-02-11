"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function PaginaDeRegistro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErro("");

        try {
            const resposta = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/register`,
                {
                    name: nome,
                    email,
                    password: senha,
                }
            );

            if (resposta.data.success) {
                router.push("/login");
            } else {
                setErro("Erro ao registrar. Tente novamente.");
            }
        } catch (erro) {
            if (erro.response) {
                setErro("Erro no servidor: " + erro.response.data.message);
            } else {
                setErro("Erro de rede: Nenhuma resposta do servidor.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Registrar</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="nome">Nome</Label>
                                <Input
                                    id="nome"
                                    placeholder="Digite seu nome"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    placeholder="Digite seu email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="senha">Senha</Label>
                                <Input
                                    id="senha"
                                    type="password"
                                    placeholder="Escolha uma senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                />
                            </div>
                            {erro && (
                                <p className="text-red-500 text-sm">{erro}</p>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2">
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? "Registrando..." : "Registrar"}
                        </Button>
                        <p className="text-sm text-muted-foreground">
                            Já tem uma conta?{" "}
                            <Link
                                href="/login"
                                className="text-primary hover:underline"
                            >
                                Entrar
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
