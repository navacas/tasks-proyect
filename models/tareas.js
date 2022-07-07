import TaskA from "./tarea.js";



class Tasks {
    _listing = {};


    get listingArray(){
         const listing = [];

        Object.keys(this._listing).forEach( key => {
            const task = this._listing[key];
            listing.push(task);
        }); // Barrer el listado

         return listing;
    }



    constructor(){
        this._listing = {};
    }

    //Borrar tarea especifica
    deleteTask( id = ''){
        if(this._listing[id]){
            delete this._listing[id];
        }
    }

    //Cargar tareas
    loadTasks(tasks = []){
        tasks.forEach( task => {
            this._listing[task.id] = task;

        });
    }

    //Creaer Tarea
    createTask( desc = '' ){
        const task = new TaskA(desc);
        this._listing[task.id] = task;
    }

    //Listar tareas
    listTasks(){
        console.log();
        this.listingArray.forEach( (task, i) => {
            const idx = `${i + 1}`.green;
            const { desc, completedDate } = task;
            const status = (completedDate) ? 'Completed'.green : 'Pending'.red;
            console.log(`${idx}. ${desc} :: ${status}` );
        })
    }

    // Listar tareas completadas y pendientes
    listCompletedPendingTasks(completed = true){
        console.log();
        let contador = 0;
        this.listingArray.forEach( task => {
            const { desc, completedDate } = task; // Sacamos el valor de completedDate
            const status = (completedDate) ? 'Completed'.green : 'Pending'.red;
            if (completed) {
                if (completedDate) {
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${completedDate.green}` );
                }
            }else{
                if (!completedDate) {
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${status}` );
                }
            }
            
        })
    }

    //Completar tareas
    toggleCompleted( ids = []) {

        ids.forEach( id => {
            const task = this._listing[id];
            if ( !task.completedDate ) {
                task.completedDate = new Date().toISOString();
            }
        });

        this.listingArray.forEach( task => {
            if( !ids.includes(task.id)){
                const tarea = this._listing[task.id];
                tarea.completedDate = null;
            }
        })
    }
}

export default Tasks;




