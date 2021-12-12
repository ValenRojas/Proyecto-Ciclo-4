import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import generatePassword from 'password-generator';
import {Llaves} from '../config/llave';
import {Persona} from '../models';
import {PersonaRepository} from '../repositories';
const generador =require("password-generator");
const cryptoJS = require("crypto-js");
const jwt=require ("jsonwebtoken");
@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  identificarPersona(usuario: string, password: string) {
    throw new Error('Method not implemented.');
  }
  generarTokenJWT(p: any) {
    throw new Error('Method not implemented.');
  }
  generarClave() {
    throw new Error('Method not implemented.');
  }
  cifrarClave(clave: any) {
    throw new Error('Method not implemented.');
  }
  constructor(@repository(PersonaRepository)
  public personaRepository:PersonaRepository) {

  }


GenerarClave(){
let clave = generador(8,false);
return clave;
}

CifrarClave(clave:string){
let claveCifrada= cryptoJS.MD5(clave).toString();
return claveCifrada;
}

GenerarTokenJWT(persona:Persona){
let token =jwt.sign({
data:{
  id:persona.id,
  correo:persona.email,
  nombre:persona.nombres+""+persona.apellidos
}
},Llaves.claveJWT);
return token;
}

ValidarTokenJWT(token:string){
  try{
    let datos= jwt.verify(token, Llaves.claveJWT);
    return datos;
  }catch{
    return false;
  }
}


IdentificarPersona(usuario:string, clave:string){
  try{
    let p= this.personaRepository.findOne({where:{email:usuario, password:clave}})
    if(p){//encontro la persona con los datos
      return p;
    }else{
      return false;
    }
  }catch{
    return false;
  }
}


}
