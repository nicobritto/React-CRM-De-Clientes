import { useNavigate ,Form,useActionData,redirect} from 'react-router-dom'
import Formulario from '../components/Formulario'
import Error from '../components/Error'
import {agregarCliente} from '../data/clientes'

export  async function action({request}){

  const formData= await request.formData()

  const datos=Object.fromEntries(formData)

  const email = formData.get('email')

    //validacion
    const errores=[]
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

    if(!regex.test(email)){
      errores.push("El email no es valido")
    }


  if(Object.values(datos).includes('')){
      errores.push('Todos los campos son obligatorios')
  }

  //retornar datos si hay errores
  if(Object.keys(errores).length){
    return errores
  }


  await agregarCliente(datos);

  return redirect('/')

}

const NuevoCliente = () => {

  const errores= useActionData()
  const navigate = useNavigate()

   
  return (

    <>
      <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
      <p className="mt-3 ">Llena todos los campos para registrar nuevo cliente  </p>

      <div className="flex justify-end">
        <button onClick={() => navigate('/')} className="bg-blue-800 text-white px-3 font-bold uppercase">
          Volver
        </button>
      </div>

      <div className='bg-whit shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20 '>

      {errores?.length && errores.map((error,i) => <Error key={i}>{error}</Error>)}

        <Form 
          method='post'   noValidate > { /* el metodo  method='post' va buscar un action que es la funcion de arribaa   */}
          <Formulario />
          <input
            type='submit'
            className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-lg '
            value="Registrar Cliente " />
        </Form>
      </div>
    </>
  )
}

export default NuevoCliente