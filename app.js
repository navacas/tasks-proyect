
import colors from 'colors';
import {saveData, readData} from './helpers/archivo.js';
import { 
    inquirerMenu, 
    pause, 
    readInput, 
    deleteListingTasks,
    confirm,
    showCheckList } from './helpers/inquirer.js';
// import TaskA from './models/tarea.js';
import Tasks from './models/tareas.js';

 

// import Task from './models/tarea.js';
// const { showMain, pause } = require('./helpers/mensajes') 



const main = async() => {
    
    // console.log('Hola mundo');

    let opt = '';
    const tasks = new Tasks();

    const taskDB = readData();
    
    if (taskDB){
        // Cargar tareas
        tasks.loadTasks( taskDB );
    }   

    do {
        // Print the menu
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                // Create option
                const desc = await readInput('Description: ');
                tasks.createTask( desc );
                break;
            case '2':
               //console.log(tasks.listingArray);
                // tasks.loadTasks( taskDB );
                tasks.listTasks();
                break;
            case '3':
                tasks.listCompletedPendingTasks(true);
                break;
            case '4':
                tasks.listCompletedPendingTasks(false);
                break;
            case '5':
                const ids = await showCheckList( tasks.listingArray);
                tasks.toggleCompleted( ids );
                break;
            case '6':
                // Para que salga el menu de borrar al seleccionar la tarea
                const id = await deleteListingTasks( tasks.listingArray); // Se pone el await para que espere que esta opción termine
                if ( id !== '0'){
                    const messageConfirmation = await confirm('¿Are you sure yo want to delete?');
                
                    if (messageConfirmation) { // Si el mensaje de confirmación es true o y, se procede a borrar la tarea
                        tasks.deleteTask( id );
                        console.log('Task Deleted');
                    }
                }
                
                break;
            case '0':

                break;
            default:
                break;
        }

        saveData( tasks.listingArray);
        
        // const task = new TaskA('buy food');
        

        await pause();
    } while( opt !== '0');

    
    //pause();

}

main();




