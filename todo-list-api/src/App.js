import './App.css';
import React from 'react'
import shortid from 'shortid'

function App() {
    const [tarea, setTarea] = React.useState({ label: '', done: false, id: '' })
    const [lista, setLista] = React.useState([])

    const createUsers = () => {
        fetch('https://assets.breatheco.de/apis/fake/todos/user/yun-todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify([])
        })
            .then((response) => response.json())
    }

    const getTodos = () => {
        fetch('https://assets.breatheco.de/apis/fake/todos/user/yun-todos', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => response.json())
            .then(json => {json.msg ? createUsers() : setLista(json)
            })
    }

    const agregarTarea = async (e) => {
        e.preventDefault()
        const newList = [...lista, tarea];
        setLista(newList)
        try {
            const request = await fetch("https://assets.breatheco.de/apis/fake/todos/user/yun-todos", {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newList)
            })
            const response = await request.json()
            console.log('response', response)
        }
        catch (error) {
            console.log(error)
        }
        setTarea({ label: '' })
    }

    const elimiarLista = id => {
        const arrayNew = (lista.filter(item => item.id !== id))
        setLista(arrayNew)
        fetch("https://assets.breatheco.de/apis/fake/todos/user/yun-todos", {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(arrayNew)
            })
            .then ((response) => response.json())
            .catch (err => console.log(err))
        }

    React.useEffect(() => {
        createUsers()
        getTodos()
    }, [])

    const elimiartodas = () => {
        setLista([])
        fetch("https://assets.breatheco.de/apis/fake/todos/user/yun-todos", {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
        //setTarea({label:''})
    }

    return (
        <div className="container ">
            <form onSubmit={agregarTarea}>
                <div className="form-row center">
                    <div className="col-10 mb-5 mt-5 ">
                        <h1 className="center">Todos Lista</h1>
                        <input type="text" className="form-control"
                            value={tarea.label}
                            placeholder="Ingresar tu tarea"
                            onChange={e => setTarea({ label: e.target.value, done: false, id: shortid.generate() })}
                        />
                        <button type="submit" className="btn btn-primary btn-lg btn-block">Agregar Tarea</button>
                    </div>
                </div>
            </form>

            <div className="row">
                <div className="col-10">
                    <ul className="list-group">
                        {lista.map(item => (
                            <li className="list-group-item" key={item.id}>{item.label}
                                <button type="button" className="btn btn-outline-primary float-right"
                                    onClick={() => elimiarLista(item.id)}>X</button>
                            </li>
                        ))}
                        {lista.length === 0 ? (<li className="list-group-item list-group-item-success" >No hay Tarea</li>) : <li className="list-group-item list-group-item-primary" >Numero de Tarea:{lista.length}</li>
                        }
                        <button type="button" className="btn btn-outline-secondary mt-5"
                            onClick={() => elimiartodas()}>Eliminar todas tareas</button>
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default App;
