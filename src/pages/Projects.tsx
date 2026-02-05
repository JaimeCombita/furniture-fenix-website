import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui';
import { PROJECTS } from '../utils/constants';
import './Projects.css';

export const ProjectsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = ['Todos', 'Educación', 'Gobierno', 'Salud', 'Empresas', 'Judicial'];

  const filteredProjects = selectedCategory === 'Todos'
    ? PROJECTS
    : PROJECTS.filter(project => project.category === selectedCategory);

  return (
    <div className="projects-page">
      <section className="projects-hero">
        <div className="container">
          <h1>Nuestros Proyectos</h1>
          <p className="projects-subtitle">
            Experiencia comprobada en más de 500 proyectos exitosos
          </p>
        </div>
      </section>

      <section className="section projects-stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Proyectos Completados</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">200+</div>
              <div className="stat-label">Clientes Satisfechos</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15</div>
              <div className="stat-label">Departamentos</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Satisfacción</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section projects-list-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Proyectos Destacados</h2>
            <div className="filter-buttons">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-image">
                  <div className="image-placeholder">
                    <i className="fas fa-building fa-4x"></i>
                  </div>
                  <div className="project-category-badge">{project.category}</div>
                </div>
                
                <div className="project-content">
                  <div className="project-meta">
                    <span className="project-date">
                      <i className="fas fa-calendar"></i>
                      {new Date(project.date).toLocaleDateString('es-ES', { 
                        year: 'numeric', 
                        month: 'long' 
                      })}
                    </span>
                    {project.client && (
                      <span className="project-client">
                        <i className="fas fa-building"></i>
                        {project.client}
                      </span>
                    )}
                  </div>

                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  {'items' in project && project.items && (
                    <div className="project-items">
                      <h4>Elementos principales:</h4>
                      <ul>
                        {project.items.map((item, index) => (
                          <li key={index}>
                            <i className="fas fa-check-circle"></i>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="no-projects">
              <i className="fas fa-folder-open fa-3x"></i>
              <p>No hay proyectos en esta categoría</p>
            </div>
          )}
        </div>
      </section>

      <section className="section testimonials-section">
        <div className="container">
          <h2 className="section-title">Lo que Dicen Nuestros Clientes</h2>
          <p className="section-subtitle">
            Testimonios de instituciones que han confiado en nosotros
          </p>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-icon">
                <i className="fas fa-quote-left"></i>
              </div>
              <p className="testimonial-text">
                "Excelente calidad en el mobiliario y cumplimiento en los tiempos de entrega. 
                El proceso de licitación fue transparente y el soporte técnico excepcional."
              </p>
              <div className="testimonial-author">
                <strong>María González</strong>
                <span>Directora de Compras - Secretaría de Educación</span>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-icon">
                <i className="fas fa-quote-left"></i>
              </div>
              <p className="testimonial-text">
                "El equipo de Fénix demostró profesionalismo en cada etapa del proyecto. 
                La instalación fue impecable y el mobiliario superó nuestras expectativas."
              </p>
              <div className="testimonial-author">
                <strong>Carlos Ramírez</strong>
                <span>Gerente Administrativo - Hospital San Rafael</span>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-icon">
                <i className="fas fa-quote-left"></i>
              </div>
              <p className="testimonial-text">
                "Trabajar con Fénix ha sido una experiencia positiva. Su asesoría en el 
                proceso de licitación fue clave para el éxito de nuestro proyecto."
              </p>
              <div className="testimonial-author">
                <strong>Ana Martínez</strong>
                <span>Rectora - Instituto Tecnológico Andino</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>¿Tienes un proyecto en mente?</h2>
            <p>
              Cuéntanos sobre tu proyecto y te ayudaremos a encontrar la mejor solución 
              de mobiliario para tu institución
            </p>
            <div className="cta-buttons">
              <Link to="/contacto">
                <Button variant="primary" size="lg">
                  Contáctanos
                </Button>
              </Link>
              <Link to="/catalogo">
                <Button variant="outline" size="lg">
                  Ver Catálogo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
