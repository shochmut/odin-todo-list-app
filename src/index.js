import './styles.css';
import {renderWebsite} from './app.js'

function loadWebsite() {
    const content = document.getElementById('content');
    content.appendChild(renderWebsite.createHeader());

  }
  
loadWebsite()