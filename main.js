const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');

// Caminhos para os controladores usando path.join
const ClienteController = require(path.join(__dirname, 'src', 'controllers', 'ClienteController.js'));
const PagamentoController = require(path.join(__dirname, 'src', 'controllers', 'PagamentoController.js'));

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'src', 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'src', 'public', 'logo.png'), // Ícone da janela
  });

  mainWindow.loadFile(path.join(__dirname, 'src', 'views', 'index.html'));
  mainWindow.on('closed', () => (mainWindow = null));

  // Remover o menu padrão
  const menu = Menu.buildFromTemplate([]);
  Menu.setApplicationMenu(menu);
}

app.on('ready', createWindow);

// Handlers de IPC
ipcMain.handle('create-cliente', async (_, data) => ClienteController.createCliente(data));
ipcMain.handle('get-clientes', async () => ClienteController.getClientes());
ipcMain.handle('update-cliente', async (_, id, data) => ClienteController.updateCliente(id, data));
ipcMain.handle('delete-cliente', async (_, id) => ClienteController.deleteCliente(id));
ipcMain.handle('create-pagamento', async (_, data) => PagamentoController.createPagamento(data));
ipcMain.handle('get-pagamentos', async (_, clienteId) => PagamentoController.getPagamentos(clienteId));
