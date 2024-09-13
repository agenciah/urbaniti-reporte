import AlbercaTemplate from './images/BackgroundTemplates/AlbercaTemplate.JPG';
import AvisosTemplate from './images/BackgroundTemplates/AvisosTemplate.JPG';
import ConserjeriaTemplate from './images/BackgroundTemplates/ConserjeríaTemplate.JPG';
import Jardineria from './images/BackgroundTemplates/JardineriaTemplate.JPG';
import JardineriaBeforeAndThen from './images/BackgroundTemplates/JardineríaAntesYDespuesTemplate.JPG';
import MantenimientoTemplate from './images/BackgroundTemplates/MantenimientoTemplate.JPG';
import SeguridadTemplate from './images/BackgroundTemplates/SeguridadTemplate.JPG';

const TemplateSelector = ({ pageType }) => {
  let selectedTemplate;

  switch (pageType) {
    case 'Jardinería':
      selectedTemplate = Jardineria;
      break;
    case 'Conserjería':
      selectedTemplate = ConserjeriaTemplate;
      break;
    case 'Mantenimiento de Alberca':
      selectedTemplate = AlbercaTemplate;
      break;
    case 'Seguridad':
      selectedTemplate = SeguridadTemplate;
      break;
    case 'Áreas Comunes':
      selectedTemplate = JardineriaBeforeAndThen;
      break;
    case 'Mantenimiento':
      selectedTemplate = MantenimientoTemplate;
      break;
    case 'Avisos':
      selectedTemplate = AvisosTemplate;
      break;
    default:
      selectedTemplate = '';
      break;
  }

  return selectedTemplate;
};

export default TemplateSelector;
