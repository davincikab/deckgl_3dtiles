import logo from './logo.svg';
import './App.css';
import MapComponent from './components/map';
import { useState } from 'react';

function App() {
  const [state, setState] = useState({
    activeDataset:'dataset2',
    activeLayer: {name:'lod22', id:1570079, label:'Lod 2'},
  });

  const datasets = {
    'dataset1':[
      // {name:'lod0',id:0, label:'Lod 0'},
      {name:'lod12', id:1569344	, label:'LOD 1.2'},
      {name:'lod13', id:1569352, label:'LOD 1.3'},
      {name:'lod22', id: 1569356, label:'LOD 2'},
    ],
    'dataset2':[
      // {name:'lod0',id:0, label:'Lod 0'},
      {name:'lod12', id:1570077, label:'Lod 1.2'},
      {name:'lod13', id:1570078, label:'Lod 1.3'},
      {name:'lod22', id:1570079, label:'Lod 2'},
    ]
  };

  const handleOnClick = (layerId) => {
    let layers = datasets[state.activeDataset];
    let layer = layers.find(layer => layer.name === layerId);

    setState({ ...state, activeLayer:layer })
  }

  const changeLayer = (dataset) => {
    setState({
      ...state,
      activeDataset:dataset,
      activeLayer:datasets[dataset][0]
    });

  }

  let { activeLayer, activeDataset } = state;

  console.log(activeDataset);
  console.log(activeLayer);

  return (
    <div className="App">
      <div className='side-tab'>
        {/* <div className='header-section'>
          Layer Control
        </div> */}
        <div className='layer-toggler'>
          <div className={activeDataset === 'dataset1' ? 'toggle-btn active' : 'toggle-btn'} onClick={() => changeLayer("dataset1")} >Dataset 1</div>
          <div className={activeDataset === 'dataset2' ? 'toggle-btn active' : 'toggle-btn'} onClick={() => changeLayer("dataset2")} >Dataset 2</div>
        </div>

        <div className='body'>
            <div className='layer-div'>

              <div className='layers-list'>
                {datasets.dataset1.map(layer => (
                  <CustomInput 
                    key={`dataset1-${layer.name}`} 
                    name="dataset1" 
                    {...layer} 
                    layer={layer}
                    activeLayer={activeLayer}
                    handleOnClick={handleOnClick} 
                  />)
                )}
              </div>

            </div>
            <div className='layer-div'>
              {/* <div className='toggle-btn'>Dataset 2</div> */}

              <div className='layers-list'>
                {/* {datasets.dataset2.map(layer => (<CustomInput key={`dataset2-${layer.name}`} name="dataset2" {...layer} handleOnClick={handleOnClick} />)) } */}
              </div>
            </div>
        </div>


      </div>

      <MapComponent 
        layer={activeLayer} 
        dataset={activeDataset}
        layers={datasets[activeDataset]}
      />

    </div>
  );
}

const CustomInput = ({name, handleOnClick, label, layer, activeLayer}) => {
  return (
    <div className='input-div'>
      <input 
        type="radio" 
        name={name} 
        id={layer.name}
        onChange={() => handleOnClick(layer.name)} 
        checked={layer.name === activeLayer.name ? true : false} 
      />
      <label htmlFor={layer.name}>{label}</label>
    </div>
  )
}

export default App;
