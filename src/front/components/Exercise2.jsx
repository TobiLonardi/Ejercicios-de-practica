import { useState,useEffect } from "react"
import { useParams } from "react-router-dom";

export const Exercise2 = () => {
    const {Id} = useParams()

    const defaultValue = {
        "id": "",
        "name": "",
        "email": ""
    }
    const  [user, setUser]  = useState(defaultValue)
    const [orders,setOrder] = useState([])
    const  [loading, setLoading ]= useState(true)
    const  [formData, setFormData] = useState({
        "product_name": "",
        "amount": "",
        "user_id": Id
    })


    const url = import.meta.env.VITE_BACKEND_URL;

    useEffect(()=>{
        fetchOrder();
        fetchUser();
    },[]);

    const fetchUser = async()=> {
         try {
             const response = await fetch(`${url}api/users/${Id}`)
             if (response.ok) {
                 const data = await response.json()
                 setUser(data.user)
                 console.log(`${data.user}`)
             }
             else {
                 console.log("error at loading user")
             }
         }
         finally {
             setLoading(false)
         }
    }

    const fetchOrder=async()=>{
         try{
             const response = await fetch(`${url}/api/user/${Id}/order`)
             if(response.ok){
                const data = await response.json()
                 setOrder(data)
             }
             else{
                console.log("Error al cargar los datos de la orden")
             }
         }
         finally{
             setLoading(false)
         }
    }

    function handlechange(e){
         setFormData({...formData,
             [e.target.name]: e.target.value,
         ["user_id"]:Id}

         )
    }

    async function handleSubmit(event){
        event.preventDefault();
        try{
            const response = await fetch(`${url}api/order`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(formData)
        })
        if(response.ok){
            setFormData({ "product_name": "","amount": "","user_id": Id})
            fetchOrder()
        }
        else{
            console.log("Error al cargar los datos")
        }
            
        }
        catch(err){
            console.log(err)
        }

    }
    return (
        <div className="container mt-5">

            <h2 className="text-center mb-4">Pedidos del Usuario # {`${Id}`} </h2>
            <div className="card p-4 mb-5 shadow">
                <h4>Informacion del usuario</h4>
                <p>Email de usuario: {user.email}</p>
                <p>Username del usuario: {user.name}</p>
            </div>

            <div className="card p-4 mb-5 shadow">
                <h4>Crear un Pedido</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Producto</label>
                        <input
                            type="text"
                            name="product_name"
                            className="form-control"
                            value={formData?.product_name}
                            onChange={handlechange}
                            placeholder="Ej: Pizza Napolitana"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Cantidad</label>
                        <input
                            type="number"
                            name="amount"
                            className="form-control"
                            value={formData?.amount}
                            onChange={handlechange}
                            placeholder="Ej: 2"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Crear Pedido
                    </button>
                </form>
            </div>

            {loading ? (
                <p>Cargando pedidos...</p>
            ) : orders.length === 0 ? (
                <p className="text-center">No hay pedidos registrados para este usuario.</p>
            ) : (
                <div className="card p-3 shadow">
                    <h4 className="mb-3">Historial de Pedidos</h4>
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Fecha de Creación</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.product_name}</td>
                                    <td>{order.amount}</td>
                                    <td>{new Date(order.created_at).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}