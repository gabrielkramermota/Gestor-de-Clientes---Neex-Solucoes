@echo off
title Setup e Inicializacao do Aplicativo
echo ======================================
echo       Setup do Projeto - Cliente Neex
echo ======================================
echo.

:menu
echo Escolha uma opcao
echo .
echo 1. Executar o aplicativo
echo .
echo 3. Sair
echo .
echo ======================================
echo .
set /p choice="Digite sua escolha (1 ou 2): "



if "%choice%"=="1" (
    echo.
    echo Iniciando o aplicativo...
    npm start
    exit /b
)

if "%choice%"=="2" (
    echo Saindo...
    exit /b
)

echo Opcao invalida. Por favor, escolha 1 ou 2.
echo.
goto menu
