import axios,{
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"
import { ICar } from "./Icar";

//url for the rest webservice at Azure
let carWebUrl: string = "https://webapicar20190326034339.azurewebsites.net/api/cars/";

let ContentElement: HTMLDivElement = <HTMLDivElement> document.getElementById("carsContent");
let GetAllCarsButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("getAllButton");

GetAllCarsButton.addEventListener('click',showAllCars);

let AddCarButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("addButton");
AddCarButton.addEventListener('click',addCar);

let deleteCarButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("deleteButton");
deleteCarButton.addEventListener('click',deleteCar);

/**
 * Function thats deletes a car 
 * This function is triggered then the click event is fired from the deleteButton
 */
function deleteCar():void{

    //finds the id for the car to delete
    let delCarIdElement: HTMLInputElement = <HTMLInputElement> document.getElementById("deleteCarId");
    let myCarId : number = +delCarIdElement.value;
    
    let deleteContentElement: HTMLDivElement = <HTMLDivElement> document.getElementById("deletecontent");

    
    //http delete request with one parameter(params) id that is set to myCarId
    axios.delete("https://webapicar20190326034339.azurewebsites.net/api/cars/"+myCarId
        )
        .then((response :  AxiosResponse): void => {
                console.log("Car is deleted ");
                console.log("Statuscode is :" + response.status);
                deleteContentElement.innerHTML = "car is deleted";
        })
        .catch(
            (error:AxiosError) : void => {                          
                console.log(error);
                deleteContentElement.innerHTML = "Error: the car is NOT deleted, look at the console";
            });

            //https://www.typescriptlang.org/docs/handbook/functions.html
            //se arrow functions 
}

function addCar():void{
    let addModelelement: HTMLInputElement = <HTMLInputElement> document.getElementById("addModel");
    let addVendorelement: HTMLInputElement = <HTMLInputElement> document.getElementById("addVendor");
    let addPriceelement: HTMLInputElement = <HTMLInputElement> document.getElementById("addPrice");

    let myModel : string = addModelelement.value;
    let myVendor: string = addVendorelement.value;
    let myPrice : number = +addPriceelement.value;  

    axios.post<ICar>("https://webapicar20190326034339.azurewebsites.net/api/cars",
                    {model:myModel,vendor:myVendor,price:myPrice})
                    .then(function (response :  AxiosResponse): void
                    {
                        console.log("Statuscode is :" + response.status);
                    })
                    .catch(
                        function (error:AxiosError) : void{                          
                            console.log(error);
                        }
                    )
                    

}

function showAllCars():void{

    axios.get<ICar[]>("https://webapicar20190326034339.azurewebsites.net/api/cars")
    .then(function (response: AxiosResponse<ICar[]>) : void
    {
        console.log("are in then");
        console.log(response);

        // let result: string = "<ol>" 
         //remove all the li elements one by one
    while (ContentElement.firstChild) {
        ContentElement.removeChild(ContentElement.lastChild);
    }
   


        response.data.forEach((car: ICar) => {
            let newNode:HTMLLIElement = AddLiElement(car.model + " " +car.vendor+ " "+car.price);
            ContentElement.appendChild(newNode);

            // result += "<li>"+ car.model + " " +car.vendor+ " "+car.price  +"</li>"
        });
        // result += "</ol>"

        // ContentElement.innerHTML= result;
        
    })
    .catch(
        function (error:AxiosError) : void{
            console.log("Error in the typescript code");
            console.log(error);

        }
    )
    
    console.log("At the end in the showAllCars function");
}

/**
 * Returns a new HTMLLIElement with the text specified in the text param
 * @param text text for the li node
 */
function AddLiElement(text:string):HTMLLIElement {
    let newLi:HTMLLIElement = document.createElement('li');
    let newTextNode:Text = document.createTextNode(text)
    newLi.appendChild(newTextNode);
            // list.appendChild(newLi);
    return newLi;
}

// showAllCars();
