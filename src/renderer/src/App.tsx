import MessagesList from "./components/MessagesList";

const App = () => {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <div>
      <MessagesList />
    </div>
  )
}

export default App;
