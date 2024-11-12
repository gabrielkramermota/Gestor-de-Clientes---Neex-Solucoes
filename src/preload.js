const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  createCliente: (data) => ipcRenderer.invoke('create-cliente', data),
  getClientes: () => ipcRenderer.invoke('get-clientes'),
  createPagamento: (data) => ipcRenderer.invoke('create-pagamento', data),
  getPagamentos: (clienteId) => ipcRenderer.invoke('get-pagamentos', clienteId),
  
  // Novas funções para atualização e exclusão de clientes
  updateCliente: (id, data) => ipcRenderer.invoke('update-cliente', id, data),
  deleteCliente: (id) => ipcRenderer.invoke('delete-cliente', id),
});
