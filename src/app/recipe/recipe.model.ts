import { Ingridient } from '../Shared/ingridient.model';

export class Recipe{
    public name:string;
    public description:string;
    public imagePath:string;
    public ingridients:Array<Ingridient>

    constructor(name:string, desc:string, imagePath:string, ingridient:Array<Ingridient>){
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.ingridients = ingridient;
    }
}