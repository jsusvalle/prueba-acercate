import React, {useContext, useEffect, useState} from 'react';

import userContext from '../context/userContext';

const PedidosScreen = props => {

    const UserContext = useContext(userContext);
    const { pedidos, getPedidos, loading } = UserContext;

    useEffect(() => {
        getPedidos(props.location.pathname[8]);
    }, [loading]);

    return (  
        <div>
            {pedidos.length === 0 ? <p>Loading...</p> 
            : pedidos.map((pedido, index) => (
                <div key={index}>
                    <strong>Cod Sucursal: </strong>{pedido.cod_sucursal}
                    <p>Estado: </p>{pedido.estado}
                    <p>fecha_creacion: </p>{pedido.fecha_creacion}
                    <p>fecha_entrega: </p>{pedido.fecha_entrega}
                    <p>sucursal: </p>{pedido.sucursal}
                    <br/>
                </div>
            ))}
        </div>
    );
}

export default PedidosScreen;