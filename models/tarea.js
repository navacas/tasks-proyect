import { v4 as uuidv4 } from 'uuid';

class TaskA {
    id = '';
    desc = '';
    completedDate = null;

    constructor( desc ){
        this.id = uuidv4();
        this.desc = desc;
        this.completedDate = null;
    }
}

export default TaskA;








