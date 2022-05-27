import Newsletter from "./componentes/Newsletter";
import {Provider} from 'react-redux'
import generateStore from "./redux/store";
function App() {
    const store = generateStore()
    return (
        <Provider store={store}>
            <div className="container p-5">
                <Newsletter></Newsletter>
            </div>
        </Provider>
    );
}

export default App;
