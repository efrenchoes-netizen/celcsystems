'use client';

export default function Process() {
  return (
    <section id="process" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Nuestro Proceso
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                1
              </div>
              <h3 className="ml-4 text-xl font-semibold text-gray-900 dark:text-white">
                Descubrimiento
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Analizamos sus necesidades, objetivos y desafíos para comprender profundamente su negocio y crear una estrategia efectiva.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                2
              </div>
              <h3 className="ml-4 text-xl font-semibold text-gray-900 dark:text-white">
                Diseño
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Creamos wireframes y diseños visuales que reflejan su identidad de marca y ofrecen la mejor experiencia de usuario.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                3
              </div>
              <h3 className="ml-4 text-xl font-semibold text-gray-900 dark:text-white">
                Desarrollo
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Desarrollamos la solución utilizando las últimas tecnologías, asegurando rendimiento, seguridad y escalabilidad.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                4
              </div>
              <h3 className="ml-4 text-xl font-semibold text-gray-900 dark:text-white">
                Pruebas
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Realizamos pruebas rigurosas para garantizar que todo funcione correctamente antes del lanzamiento.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                5
              </div>
              <h3 className="ml-4 text-xl font-semibold text-gray-900 dark:text-white">
                Lanzamiento
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Lanzamos su proyecto y proporcionamos capacitación para que su equipo pueda administrarlo eficazmente.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                6
              </div>
              <h3 className="ml-4 text-xl font-semibold text-gray-900 dark:text-white">
                Soporte
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Ofrecemos soporte continuo y mantenimiento para asegurar que su solución siga funcionando óptimamente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}