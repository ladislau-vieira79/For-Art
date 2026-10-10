import Item from './Item'

function List(){
    return (
       <>
        <h1>Minha Lista</h1>
        <ul>
            <Item marca="Jetour" ano_lancamento={2017} />
            <Item marca="Mercedes" ano_lancamento={1945} />
        </ul>
       </>
    )
}

export default List