import './admin.css';
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebaseConnection';
import { signOut } from 'firebase/auth';
import { 
    addDoc, 
    collection, 
    onSnapshot, 
    query, 
    orderBy, 
    where,
    doc,
    deleteDoc,
    updateDoc
} from 'firebase/firestore';

export default function Admin(){
    const [taskInput, setTaskInput] = useState('');
    const [userActive, setUserActive] = useState({});
    const [tasks, setTasks] = useState([]);
    const [editTask, setEditTask] = useState({});

    useEffect(()=>{
        async function loadTasks(){
            const userDetail = localStorage.getItem('@userDetail');
            setUserActive(JSON.parse(userDetail));

            //se user logado, buscar só as tarefas desse user
            if(userDetail){
                const data = JSON.parse(userDetail);

                const taskRef = collection(db, 'tasks');
                const q = query( taskRef, orderBy('created', 'desc'),  where('userUid', '==', data?.uid) );
                
                const unsub = onSnapshot(q, (snapshot) => {
                    let list = [];

                    snapshot.forEach((firebaseDocument)=>{
                        list.push({
                            id: firebaseDocument.id,
                            task: firebaseDocument.data().task,
                            userUid: firebaseDocument.data().userUid,
                        });  
                    });
                    setTasks(list);
                });
            };
        };

        loadTasks();
    }, []);


    async function handleTask(e){
        e.preventDefault();

        // se não há nada digitado no input
        if(taskInput === ''){
            alert('Digite uma nova tarefa para continuar.');
            return;
        }

        // se o btn de edit foi clicado
        if(editTask?.id) {
            handleUpdateTask();
            return;
        }

        // adicionar no bd, passando o input, data e id do user
        await addDoc(collection(db, 'tasks'), {
            task: taskInput,
            created: new Date(),
            userUid: userActive?.uid
        })
        .then(()=>{
            console.log('task added sucessfully ✅');
            setTaskInput('');
        })
        .catch((err)=>{
            console.log(`Something got wrong, ❌ error code: ${err}`);
        })  
    };

    // sair do usuario logado
    function handleSignOut(){
        signOut(auth);
    };

    // remover task do bd
    async function taskDone(id){
        const docRef = doc(db, 'tasks', id);
        await deleteDoc(docRef);
    }

    // editar task na tela do usuario
    function editTaskClicked(item){
        setEditTask(item);
        setTaskInput(item.task);
    }

    // atualizar task no clique do btn dentro do bd
    async function handleUpdateTask(){
        const docRef = doc(db, 'tasks', editTask?.id);
        await updateDoc(docRef, {
            task: taskInput,
        })
        .then( ()=>{
            console.log('task updated sucessfully ✅');
            setTaskInput('');
            setEditTask({});
        })
        .catch((err)=>{
            console.log(`We got an error updating this task ❌. Code error: ${err}`);
            setTaskInput('');
            setEditTask({});
        })
    }

    return(
        <div className='admin--container flex--centralized'>
            <h1>Minhas tarefas:</h1>

            <form className='form' onSubmit={handleTask}>
                <input
                    type='text'
                    placeholder='Digite sua tarefa...'
                    value={taskInput}
                    onChange={ (e)=> setTaskInput(e.target.value)}
                />
                {Object.keys(editTask).length > 0 ? (
                    <button style={{backgroundColor: 'var(--green)'}}>Editar Task</button>) : (
                    <button>Adicionar Task</button> )
                }

            </form>

            <article className='admin--taskList-container'>
                {tasks.map((item) => (
                    <div key={item.id} className='admin--taskList'>
                        <div className='admin--taskList-item'>
                            <p>{item.task}</p>
                        </div>
                        <div>
                            <button 
                                onClick= { () => editTaskClicked(item) }
                                className='admin--btn edit'>
                                    Editar
                            </button>
                            <button 
                                onClick= { () => taskDone(item.id) }
                                className='admin--btn done'>
                                    Concluir
                            </button>   
                        </div>
                    </div>
                ))}
            </article>
                
            <div className='admin--navBar'>
                    <h1>What <span id='brandmark' className='highlighted--color'>Should</span> Do</h1>
                    <li onClick={handleSignOut} className='text--decoration'>Sair</li>
            </div>
        </div>
    );
}