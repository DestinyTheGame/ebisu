import { useCallback, useState } from 'react';
import { state, parse } from '../../storage';
import { useDropzone } from 'react-dropzone';
import { FaFileCsv } from 'react-icons/fa';
import Header from '../header';
import Alert from '../alert';

import './styles.css';

/**
 * Display a dropzone that will accept a users destinyArmor.csv file so we
 * can use it as it as source of information.
 *
 * @return {React.Element} The dropzone.
 * @public
 */
export default function Dropzone() {
  const [failed, setFailed] = useState();
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: useCallback(function dropped(files) {
      files.forEach(async function each(file) {
        let armor;

        try { armor = await parse(file); }
        catch (e) { return setFailed(e); }

        state.armor = armor;
      });
    })
  });

  return (
    <>
    <Header />
    <div className="dropzone">
      { failed && <Alert error={ failed } /> }
      <div { ...getRootProps() }>
        <div className="empty">
          <input { ...getInputProps() } />

          <div className="empty-icon">
            <FaFileCsv />
          </div>

          <h5 className="empty-title">Import the destinyArmor.csv</h5>
          <p className="empty-subtitle">Drag 'n' drop the .csv or click to select</p>
        </div>
      </div>
    </div>
    </>
  );
}
