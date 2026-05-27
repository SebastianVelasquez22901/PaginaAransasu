import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'

const MANUAL = [
  {
    id: 'panel',
    emoji: '🖥️',
    title: 'Panel de edición',
    color: 'violet',
    items: [
      {
        title: 'Cómo ingresar al editor',
        tags: ['contraseña', 'login', 'acceso', 'entrar', 'admin'],
        body: 'Ve a la dirección de tu sitio seguida de /admin (por ejemplo: tusitio.com/admin). Ingresa tu contraseña para acceder. Si olvidaste la contraseña, contacta a tu desarrollador.',
      },
      {
        title: 'Publicar cambios',
        tags: ['publicar', 'guardar', 'deploy', 'netlify', 'cambios'],
        body: 'Cuando termines de editar, presiona el botón "Publicar cambios" en la barra superior derecha. Los cambios aparecerán en tu sitio en 2–3 minutos. No se guardan automáticamente: debes publicar cada vez que hagas cambios.',
      },
      {
        title: 'Ver el sitio en vivo',
        tags: ['ver sitio', 'preview', 'público', 'visitantes'],
        body: 'En la barra superior hay un enlace "Ver sitio →" que abre tu página pública en una nueva pestaña. Úsalo para revisar cómo se ve lo que editaste antes y después de publicar.',
      },
      {
        title: 'Reordenar bloques',
        tags: ['orden', 'mover', 'arrastrar', 'drag', 'reordenar'],
        body: 'Cada bloque tiene una barra gris con puntos en la parte superior. Mantén presionado y arrastra para cambiar el orden de los bloques en la página. El orden en el editor es el mismo que ven tus visitantes.',
      },
      {
        title: 'Mostrar u ocultar un bloque',
        tags: ['ocultar', 'mostrar', 'visible', 'invisible', 'visibilidad'],
        body: 'En la esquina superior derecha de cada bloque hay un ícono de ojo. Al hacer clic lo puedes ocultar (los visitantes no lo ven) o mostrarlo nuevamente. El bloque oculto se verá con fondo rayado en el editor pero no aparecerá en el sitio.',
      },
      {
        title: 'Agregar un nuevo bloque',
        tags: ['agregar', 'nuevo', 'bloque', 'añadir', 'sidebar'],
        body: 'En el panel derecho (sidebar) verás las plantillas de bloques disponibles: Bienvenida, Sobre mí, Servicios, Precios, Libros y Podcast. Arrastra cualquiera hacia la zona de edición para agregarlo. Puedes tener varios bloques del mismo tipo.',
      },
      {
        title: 'Eliminar un bloque',
        tags: ['eliminar', 'borrar', 'quitar', 'bloque'],
        body: 'En la esquina superior de cada bloque hay un botón con ícono de papelera o "Eliminar". Al presionarlo se borra el bloque definitivamente. Esta acción no se puede deshacer, así que asegúrate antes de eliminar.',
      },
    ],
  },
  {
    id: 'navbar',
    emoji: '☰',
    title: 'Navbar (barra de navegación)',
    color: 'blue',
    items: [
      {
        title: 'Qué es la navbar',
        tags: ['navbar', 'menu', 'menú', 'navegación', 'barra'],
        body: 'La navbar es la barra fija en la parte superior de tu sitio. Muestra el nombre de tu marca, los enlaces a cada sección y un botón de llamada a la acción (CTA). En móviles se convierte en un menú hamburguesa.',
      },
      {
        title: 'Editar la navbar',
        tags: ['navbar', 'editar', 'abrir', 'configurar'],
        body: 'En la barra superior del editor presiona el botón "☰ Navbar". Se desplegará un panel donde puedes cambiar el nombre, colores y el botón CTA. Los cambios se aplican en tiempo real en la vista previa.',
      },
      {
        title: 'Nombre del sitio (marca)',
        tags: ['nombre', 'marca', 'brand', 'logo', 'titulo'],
        body: 'El campo "Nombre del sitio" aparece como texto destacado a la izquierda de la navbar. Puedes poner tu nombre, el nombre de tu práctica o cualquier texto corto. Al hacer clic lleva al inicio de la página.',
      },
      {
        title: 'Los enlaces del menú',
        tags: ['enlaces', 'links', 'menu', 'automático'],
        body: 'Los enlaces del menú se generan automáticamente según los bloques que tengas visibles en la página. Si tienes un bloque "Servicios" visible, aparecerá "Servicios" en el menú. No necesitas configurarlos manualmente.',
      },
      {
        title: 'Botón CTA en la navbar',
        tags: ['cta', 'botón', 'contacto', 'agendar', 'reservar'],
        body: 'El botón CTA (llamada a la acción) aparece a la derecha del menú. Puedes personalizar su texto (ej: "Agendar consulta") y hacia dónde lleva (ej: #contacto o un enlace externo). Si dejas el texto vacío, el botón no aparece.',
      },
      {
        title: 'Colores de la navbar',
        tags: ['color', 'fondo', 'texto', 'acento', 'navbar'],
        body: 'Puedes cambiar 3 colores: Fondo (color de la barra), Texto (color de los enlaces) y Acento (color del nombre de marca y del botón CTA). Haz clic en el cuadro de color para abrir el selector.',
      },
      {
        title: 'Línea de hover en los enlaces',
        tags: ['hover', 'linea', 'animación', 'subrayado', 'color', 'grosor'],
        body: 'Al pasar el cursor sobre un enlace del menú, aparece una línea animada debajo del texto. Puedes elegir el color de esa línea y su grosor (de 1 a 6 px) en la sección "Hover de enlaces" dentro del editor de navbar.',
      },
    ],
  },
  {
    id: 'hero',
    emoji: '🌟',
    title: 'Bloque Bienvenida (Hero)',
    color: 'yellow',
    items: [
      {
        title: 'Para qué sirve',
        tags: ['hero', 'bienvenida', 'portada', 'inicio'],
        body: 'Es el primer bloque que ven los visitantes al entrar al sitio. Contiene un título principal, un subtítulo y un botón de llamada a la acción. Es ideal para presentar tu propuesta de valor de forma impactante.',
      },
      {
        title: 'Título y subtítulo',
        tags: ['titulo', 'subtitulo', 'texto', 'hero'],
        body: 'El título es el texto grande y destacado. El subtítulo va debajo, con menor prominencia. Sé breve: el título debe captar la atención y el subtítulo aclarar qué haces o a quién ayudas.',
      },
      {
        title: 'Botón de acción',
        tags: ['botón', 'boton', 'cta', 'enlace', 'acción', 'hero'],
        body: 'El botón tiene un texto editable (ej: "Agenda tu consulta") y una acción. La acción puede ser: ir a una sección de la página (#servicios), abrir un enlace externo (WhatsApp, calendly) o mostrar un mensaje de "Próximamente". Si dejas el texto vacío, el botón no aparece.',
      },
      {
        title: 'Imagen de fondo o decorativa',
        tags: ['imagen', 'foto', 'hero', 'fondo'],
        body: 'Puedes agregar una URL de imagen (sube tu foto a un servicio como Cloudinary, ImgBB o simplemente usa el enlace directo de una imagen en línea). Si dejas el campo vacío, el bloque muestra solo el fondo de color.',
      },
      {
        title: 'Alineación del texto',
        tags: ['alineación', 'izquierda', 'centro', 'derecha', 'justificado', 'texto'],
        body: 'Los botones de alineación (izquierda, centro, derecha, justificado) cambian cómo se posiciona el contenido dentro del bloque. "Centro" es lo más común para un hero; "Izquierda" da un estilo más moderno y editorial.',
      },
      {
        title: 'Fuente tipográfica',
        tags: ['fuente', 'tipografia', 'font', 'inter', 'poppins', 'lora'],
        body: 'Elige entre 8 fuentes: Inter, Poppins, Lato, Raleway (sans-serif), Playfair, Merriweather, Lora (serif) y Dancing Script (caligráfica). Cada una da una personalidad diferente al bloque.',
      },
      {
        title: 'Colores del bloque',
        tags: ['color', 'fondo', 'texto', 'hero'],
        body: 'Puedes cambiar el color de fondo del bloque y el color del texto. Asegúrate de que haya suficiente contraste para que el texto sea legible.',
      },
    ],
  },
  {
    id: 'about',
    emoji: '👤',
    title: 'Bloque Sobre mí',
    color: 'green',
    items: [
      {
        title: 'Para qué sirve',
        tags: ['sobre mi', 'about', 'presentación', 'bio'],
        body: 'Este bloque es tu presentación personal. Aquí puedes contar tu historia, tu formación profesional, tu enfoque terapéutico y lo que te hace única. Genera confianza antes de que el visitante te contacte.',
      },
      {
        title: 'Texto de presentación',
        tags: ['texto', 'bio', 'descripción', 'sobre mi'],
        body: 'El campo de texto admite párrafos largos. Puedes usar saltos de línea para separar ideas. No hay límite de caracteres, pero se recomienda ser concisa: 3–5 párrafos son suficientes para captar la atención.',
      },
      {
        title: 'Imagen',
        tags: ['imagen', 'foto', 'sobre mi', 'perfil'],
        body: 'Agrega la URL de tu foto profesional. Se mostrará al lado del texto. Usa una imagen cuadrada o vertical para mejor resultado visual. Si no agregas imagen, el texto ocupa todo el ancho del bloque.',
      },
      {
        title: 'Color de acento',
        tags: ['color', 'acento', 'linea', 'decoración', 'sobre mi'],
        body: 'El color de acento se usa en elementos decorativos del bloque (líneas, separadores). Es el tercer color configurable junto con fondo y texto.',
      },
    ],
  },
  {
    id: 'services',
    emoji: '📋',
    title: 'Bloque Servicios',
    color: 'orange',
    items: [
      {
        title: 'Para qué sirve',
        tags: ['servicios', 'tarjetas', 'cards', 'que ofrezco'],
        body: 'Muestra en tarjetas los servicios que ofreces. Cada tarjeta tiene un emoji, un título y una descripción. Puedes tener tantas tarjetas como quieras y reordenarlas.',
      },
      {
        title: 'Agregar o quitar tarjetas',
        tags: ['agregar', 'eliminar', 'tarjeta', 'servicios'],
        body: 'En el editor, dentro de "Tarjetas de servicios", presiona "+ Agregar" para una nueva tarjeta. Para eliminar una, presiona la "×" en su esquina derecha.',
      },
      {
        title: 'Cambiar el emoji de una tarjeta',
        tags: ['emoji', 'icono', 'tarjeta', 'servicios', 'catalogo'],
        body: 'Haz clic en el emoji de la tarjeta para abrir el selector de emojis. Hay 48 emojis organizados por categorías (mente, corazón, personas, naturaleza, logros, herramientas). También puedes escribir cualquier emoji personalizado en el campo de texto.',
      },
      {
        title: 'Alineación de cada tarjeta',
        tags: ['alineación', 'tarjeta', 'texto', 'izquierda', 'centro'],
        body: 'Cada tarjeta tiene su propio control de alineación de texto (izquierda, centro, derecha, justificado). Esto te permite tener tarjetas con diferentes alineaciones dentro del mismo bloque.',
      },
      {
        title: 'Animación de tarjetas (escalonada)',
        tags: ['animación', 'tarjeta', 'stagger', 'entrada', 'scroll'],
        body: 'La "Animación de tarjetas" hace que cada tarjeta aparezca con un pequeño retraso entre sí al hacer scroll. Elige entre: Sin animación, Aparecer, Subir, Entra desde izquierda, Entra desde derecha, Zoom.',
      },
      {
        title: 'Animación del bloque',
        tags: ['animación', 'bloque', 'scroll', 'entrada', 'servicios'],
        body: 'La "Animación del bloque" aplica la animación a todo el bloque como unidad al entrar en pantalla. Es independiente de la animación de tarjetas.',
      },
    ],
  },
  {
    id: 'pricing',
    emoji: '💰',
    title: 'Bloque Precios',
    color: 'emerald',
    items: [
      {
        title: 'Para qué sirve',
        tags: ['precios', 'planes', 'tarifas', 'pricing'],
        body: 'Muestra tus planes o tarifas de forma clara. Cada plan tiene nombre, descripción, precio, período y una lista de características incluidas o no incluidas.',
      },
      {
        title: 'Agregar o quitar planes',
        tags: ['agregar', 'eliminar', 'plan', 'precios'],
        body: 'Presiona "+ Agregar plan" para crear uno nuevo. Cada plan tiene un botón "Eliminar" en su esquina superior derecha.',
      },
      {
        title: 'Plan destacado',
        tags: ['destacado', 'featured', 'recomendado', 'plan'],
        body: 'Marca la casilla "Destacado" en un plan para que se muestre con un borde o fondo diferente que lo resalte visualmente. Normalmente se usa en el plan más popular o recomendado.',
      },
      {
        title: 'Moneda y precio',
        tags: ['moneda', 'precio', 'Q', 'quetzales', 'pesos', 'dolares'],
        body: 'El campo "Moneda" es un texto libre: puedes poner Q, $, €, etc. El "Precio" también es texto: puedes poner "250", "Consultar" o lo que necesites.',
      },
      {
        title: 'Características del plan',
        tags: ['caracteristicas', 'features', 'incluido', 'no incluido', 'lista'],
        body: 'Cada plan tiene una lista de características. El círculo a la izquierda indica si está incluida (morado lleno) o no incluida (círculo vacío). Haz clic en el círculo para cambiar su estado. Usa "+ Agregar" para añadir más características.',
      },
      {
        title: 'Botón de acción del plan',
        tags: ['botón', 'cta', 'reservar', 'plan', 'enlace'],
        body: 'Cada plan tiene su propio botón con texto editable y destino configurable (sección de la página, enlace externo o mensaje de próximamente).',
      },
    ],
  },
  {
    id: 'books',
    emoji: '📚',
    title: 'Bloque Libros recomendados',
    color: 'pink',
    items: [
      {
        title: 'Para qué sirve',
        tags: ['libros', 'recomendados', 'recursos', 'books'],
        body: 'Muestra en una cuadrícula los libros que recomiendas a tus pacientes o lectores. Cada libro tiene portada, título, autor, descripción y un enlace opcional (ej: a Amazon o una reseña).',
      },
      {
        title: 'Agregar un libro',
        tags: ['agregar', 'libro', 'nuevo', 'books'],
        body: 'Presiona "+ Agregar libro" dentro del editor. Completa el título, autor, descripción y, si tienes una imagen de portada, pega su URL. El campo "Enlace" es opcional y lleva a una página externa al hacer clic.',
      },
      {
        title: 'Imagen de portada',
        tags: ['imagen', 'portada', 'libro', 'url', 'foto'],
        body: 'Busca el libro en Google Images o Amazon, copia la URL de la imagen y pégala en el campo "Imagen". Si no agregas imagen, se mostrará un marcador de posición con el título.',
      },
      {
        title: 'Enlace del libro',
        tags: ['enlace', 'link', 'amazon', 'libro', 'externo'],
        body: 'El campo "Enlace" es opcional. Si lo rellenas, la tarjeta del libro se convierte en un enlace que abre en una nueva pestaña. Útil para enlazar a Amazon, Goodreads o tu propio blog.',
      },
    ],
  },
  {
    id: 'podcast',
    emoji: '🎙️',
    title: 'Bloque Podcast',
    color: 'red',
    items: [
      {
        title: 'Para qué sirve',
        tags: ['podcast', 'audio', 'episodios', 'spotify', 'apple'],
        body: 'Muestra los botones para escuchar tu podcast en distintas plataformas y una lista de episodios destacados. Ideal si tienes un podcast de bienestar o salud mental.',
      },
      {
        title: 'Plataformas de escucha',
        tags: ['spotify', 'apple', 'youtube', 'google', 'podcast', 'plataformas'],
        body: 'Puedes agregar hasta 4 enlaces de plataformas: Spotify, Apple Podcasts, YouTube y Google Podcasts. Pega el enlace a tu perfil o show en cada plataforma. Solo aparecen los botones que tengan URL configurada.',
      },
      {
        title: 'Agregar episodios',
        tags: ['episodio', 'agregar', 'lista', 'podcast'],
        body: 'Cada episodio tiene: título, descripción, duración, fecha y un enlace al episodio. No es necesario completar todos los campos. Los episodios se muestran en el orden en que los agregas.',
      },
    ],
  },
  {
    id: 'animaciones',
    emoji: '✨',
    title: 'Animaciones de scroll',
    color: 'purple',
    items: [
      {
        title: 'Cómo funcionan las animaciones',
        tags: ['animación', 'scroll', 'entrada', 'intersection', 'automatico'],
        body: 'Las animaciones se activan automáticamente cuando el visitante hace scroll y el bloque entra en pantalla. No hacen nada al cargar la página, solo cuando el bloque se vuelve visible.',
      },
      {
        title: 'Tipos de animación disponibles',
        tags: ['tipos', 'animación', 'fade', 'zoom', 'subir', 'izquierda', 'derecha'],
        body: '6 opciones: Sin animación (aparece directo), Aparecer (fade simple), Subir (sube desde abajo), ← Entra (entra desde la izquierda), → Entra (entra desde la derecha), Zoom (aparece creciendo). Prueba cada una para ver cuál se adapta mejor a tu estilo.',
      },
      {
        title: 'Animación de bloque vs animación de tarjetas',
        tags: ['bloque', 'tarjeta', 'animación', 'diferencia', 'stagger'],
        body: 'En bloques con tarjetas (Servicios) hay dos animaciones: la del bloque completo al entrar a pantalla, y la de las tarjetas entre sí (escalonada). La animación escalonada hace que las tarjetas aparezcan una después de la otra con 110ms de diferencia.',
      },
    ],
  },
  {
    id: 'fuentes',
    emoji: '🔤',
    title: 'Fuentes y tipografía',
    color: 'indigo',
    items: [
      {
        title: 'Catálogo de fuentes disponibles',
        tags: ['fuente', 'font', 'tipografía', 'letra', 'inter', 'poppins', 'lato', 'raleway', 'playfair', 'merriweather', 'lora', 'dancing'],
        body: '8 fuentes organizadas en 3 grupos: Sans-serif (Inter, Poppins, Lato, Raleway) para un estilo moderno y limpio; Serif (Playfair Display, Merriweather, Lora) para un estilo elegante y clásico; Script (Dancing Script) para un toque personal y caligráfico.',
      },
      {
        title: 'Cómo se muestra cada fuente en el editor',
        tags: ['fuente', 'preview', 'ver', 'botón'],
        body: 'En el selector de fuentes, cada botón muestra "Aa" escrito en esa fuente para que puedas ver el estilo antes de elegirla. El nombre de la fuente siempre está en Inter para que sea legible.',
      },
      {
        title: 'La fuente aplica a todo el bloque',
        tags: ['fuente', 'alcance', 'bloque', 'tarjetas'],
        body: 'La fuente que eliges se aplica a todo el bloque: título, párrafos, botones y tarjetas. No se puede cambiar la fuente por elemento individual dentro del bloque.',
      },
    ],
  },
  {
    id: 'colores',
    emoji: '🎨',
    title: 'Colores',
    color: 'teal',
    items: [
      {
        title: 'Cómo funciona el selector de color',
        tags: ['color', 'selector', 'picker', 'hex', 'rgb'],
        body: 'Haz clic en el cuadro de color para abrir el selector. Puedes elegir un color visualmente o escribir un código hexadecimal (ej: #7c3aed) directamente en el campo de texto. Los cambios se ven en tiempo real.',
      },
      {
        title: 'Color de fondo',
        tags: ['fondo', 'background', 'color', 'bloque'],
        body: 'Define el color de fondo del bloque completo. Cada bloque puede tener su propio color de fondo. Alternar colores claros y ligeramente diferentes entre bloques da sensación de secciones bien definidas.',
      },
      {
        title: 'Color de texto',
        tags: ['texto', 'color', 'legibilidad', 'contraste'],
        body: 'Define el color de todos los textos del bloque. Asegúrate de que haya buen contraste con el color de fondo. Una regla práctica: fondo claro + texto oscuro, o fondo oscuro + texto claro.',
      },
      {
        title: 'Color de acento',
        tags: ['acento', 'decoración', 'color', 'detalles'],
        body: 'El color de acento se usa en elementos secundarios: bordes decorativos, íconos, líneas divisoras. Generalmente se elige un color que complemente al fondo pero que sea más vibrante.',
      },
    ],
  },
  {
    id: 'alineacion',
    emoji: '↔️',
    title: 'Alineación de texto',
    color: 'gray',
    items: [
      {
        title: 'Opciones de alineación',
        tags: ['alineación', 'izquierda', 'centro', 'derecha', 'justificado'],
        body: '4 opciones: Izquierda (texto pegado a la izquierda, más natural para lectura larga), Centro (clásico para secciones de presentación), Derecha (para efectos especiales), Justificado (el texto ocupa todo el ancho, como en periódicos).',
      },
      {
        title: 'Alineación por bloque vs por tarjeta',
        tags: ['bloque', 'tarjeta', 'alineación', 'individual'],
        body: 'En Hero y Sobre mí, la alineación aplica a todo el bloque. En Servicios, cada tarjeta tiene su propia alineación independiente. Esto te da más flexibilidad para diseñar cada servicio de forma diferente.',
      },
    ],
  },
  {
    id: 'botones',
    emoji: '🔗',
    title: 'Botones y enlaces',
    color: 'sky',
    items: [
      {
        title: 'Tipos de acción para un botón',
        tags: ['botón', 'acción', 'enlace', 'whatsapp', 'sección', 'próximamente', 'externo'],
        body: '3 tipos: Sección de la página (ej: #servicios, lleva al visitante a esa sección), Enlace externo (URL completa, como WhatsApp, Calendly o tu Instagram), Próximamente (muestra un modal que dice que está en construcción).',
      },
      {
        title: 'Cómo enlazar a WhatsApp',
        tags: ['whatsapp', 'enlace', 'contacto', 'wa.me'],
        body: 'Para enlazar a WhatsApp, usa este formato en el campo de enlace: https://wa.me/NUMEROCOMPLETO (ej: https://wa.me/50212345678 para Guatemala). Incluye el código de país sin el signo +.',
      },
      {
        title: 'Cómo enlazar a una sección de la página',
        tags: ['sección', 'ancla', 'anchor', 'inicio', 'servicios', 'scroll'],
        body: 'Escribe el ancla con # seguido del nombre: #inicio, #sobre-mi, #servicios, #precios, #libros, #podcast. Al hacer clic en el botón, la página hará scroll suave hasta esa sección.',
      },
    ],
  },
  {
    id: 'ubicacion',
    emoji: '📍',
    title: 'Bloque Ubicación',
    color: 'green',
    items: [
      {
        title: 'Para qué sirve',
        tags: ['ubicación', 'consultorio', 'dirección', 'mapa', 'horarios'],
        body: 'Muestra la dirección de tu consultorio, los horarios de atención, teléfono, correo y un mapa interactivo de Google Maps. Aparece en la navbar como "Ubicación" y los visitantes pueden hacer clic en "Cómo llegar" para abrir Google Maps directamente.',
      },
      {
        title: 'Cómo agregar el mapa de Google',
        tags: ['mapa', 'google maps', 'embed', 'url', 'incrustar'],
        body: 'Sigue estos pasos: (1) Abre Google Maps y busca tu dirección exacta. (2) Haz clic en el ícono de Compartir. (3) Selecciona la pestaña "Incorporar un mapa". (4) Copia solo la URL que está dentro de src="..." — no copies todo el código, solo la URL. (5) Pégala en el campo "URL del mapa" del editor.',
      },
      {
        title: 'Enlace de Google Maps (botón Cómo llegar)',
        tags: ['enlace', 'como llegar', 'botón', 'maps', 'navegación'],
        body: 'Este es un enlace diferente al del mapa incrustado. Para obtenerlo: busca tu dirección en Google Maps, copia la URL de la barra del navegador (ej: https://maps.google.com/?q=...). Este enlace abre Google Maps en una nueva pestaña cuando el visitante hace clic en "Cómo llegar".',
      },
      {
        title: 'Horarios de atención',
        tags: ['horarios', 'días', 'horas', 'atención'],
        body: 'Agrega los días y horas que atiendes. Cada fila tiene dos campos: días (ej: "Lunes – Viernes") y horas (ej: "9:00 – 18:00"). Puedes tener tantas filas como necesites y eliminar las que no uses.',
      },
      {
        title: 'Teléfono y correo en el bloque',
        tags: ['teléfono', 'correo', 'contacto', 'ubicación'],
        body: 'Si rellenas el teléfono y el correo, aparecen como enlaces clicables en la tarjeta de información. El teléfono llama al número al hacer clic (en móviles). El correo abre el cliente de correo del visitante.',
      },
    ],
  },
  {
    id: 'footer',
    emoji: '▦',
    title: 'Footer (pie de página)',
    color: 'slate',
    items: [
      {
        title: 'Qué es el footer',
        tags: ['footer', 'pie', 'parte inferior', 'copyright'],
        body: 'El footer es la sección fija al final de tu sitio. Siempre está presente y no se puede eliminar, solo editar. Muestra tu nombre, una frase, información de contacto, íconos de redes sociales y el texto de copyright.',
      },
      {
        title: 'Cómo editar el footer',
        tags: ['footer', 'editar', 'abrir', 'configurar'],
        body: 'Tienes dos formas: (1) Presiona el botón "▦ Footer" en la barra superior del editor — se abre el panel igual que la navbar. (2) Baja hasta el final del editor y presiona "Editar footer" en la barra gris que aparece encima del footer.',
      },
      {
        title: 'Nombre y frase corta',
        tags: ['nombre', 'marca', 'frase', 'tagline', 'footer'],
        body: 'El campo "Nombre / Marca" aparece destacado en el footer (con el color de acento). La "Frase corta" va debajo como una descripción breve de tu práctica.',
      },
      {
        title: 'Correo y teléfono',
        tags: ['correo', 'email', 'teléfono', 'whatsapp', 'contacto', 'footer'],
        body: 'El correo se convierte en un enlace mailto: al hacer clic. El teléfono se convierte en un enlace de WhatsApp automáticamente. Puedes ponerlo con o sin código de país (ej: +502 1234 5678 o 50212345678).',
      },
      {
        title: 'Redes sociales',
        tags: ['redes', 'social', 'instagram', 'facebook', 'tiktok', 'youtube', 'linkedin', 'twitter', 'footer'],
        body: 'Hay 7 plataformas disponibles: Instagram, Facebook, WhatsApp, TikTok, YouTube, LinkedIn y X/Twitter. Pega el enlace completo a tu perfil en cada plataforma. Los íconos solo aparecen en el sitio si tienen una URL configurada — los que dejes vacíos no se muestran.',
      },
      {
        title: 'Texto de copyright',
        tags: ['copyright', 'año', 'derechos', 'footer'],
        body: 'El campo de copyright acepta texto libre. Escribe {year} (con llaves) donde quieras que aparezca el año actual — se reemplaza automáticamente. Ejemplo: "© {year} Mi nombre · Todos los derechos reservados".',
      },
      {
        title: 'Colores del footer',
        tags: ['color', 'fondo', 'texto', 'acento', 'footer', 'oscuro'],
        body: 'El footer tiene 3 colores: Fondo (por defecto oscuro #1a1a2e), Texto y Acento (para el nombre de marca e íconos de redes). Puedes cambiarlo a cualquier color que combine con tu diseño.',
      },
    ],
  },
  {
    id: 'carrusel',
    emoji: '🖼️',
    title: 'Bloque Carrusel de fotos',
    color: 'fuchsia',
    items: [
      {
        title: 'Para qué sirve',
        tags: ['carrusel', 'galería', 'fotos', 'imágenes', 'slider'],
        body: 'El carrusel muestra una secuencia de fotos que el visitante puede ver pasando una a una. Ideal para mostrar tu espacio de consulta, eventos, talleres, momentos o cualquier galería de imágenes.',
      },
      {
        title: 'Cómo agregar fotos',
        tags: ['agregar', 'foto', 'url', 'imagen', 'carrusel'],
        body: 'En el editor del bloque presiona "+ Agregar foto". Pega la URL directa de la imagen en el campo. La imagen aparecerá como miniatura de vista previa en el editor para confirmar que cargó bien. Si la URL es incorrecta, la miniatura no muestra nada.',
      },
      {
        title: 'De dónde obtener la URL de una foto',
        tags: ['url', 'imagen', 'subir', 'cloudinary', 'imgbb', 'google', 'carrusel'],
        body: 'Opciones para obtener una URL de imagen: (1) Sube la foto a ImgBB (imgbb.com) — es gratis y te da un enlace directo. (2) Usa Cloudinary para almacenamiento profesional. (3) Si la foto ya está en internet, copia el enlace directo de la imagen (clic derecho → "Copiar dirección de imagen").',
      },
      {
        title: 'Pie de foto (caption)',
        tags: ['pie', 'caption', 'descripción', 'foto', 'texto', 'overlay'],
        body: 'Cada foto tiene un campo "Pie de foto" opcional. Si lo rellenas, aparece como texto sobre la imagen en la parte inferior, con un fondo degradado oscuro para que sea legible. Si lo dejas vacío, la foto se muestra sola.',
      },
      {
        title: 'Avance automático',
        tags: ['automático', 'autoplay', 'intervalo', 'timer', 'carrusel'],
        body: 'El toggle "Avance automático" hace que las fotos cambien solas. Cuando está activo, aparece un slider para elegir cada cuántos segundos cambia (de 2 a 10 segundos). Al pasar el cursor sobre una flecha o punto, el temporizador no se interrumpe.',
      },
      {
        title: 'Altura de las fotos',
        tags: ['altura', 'tamaño', 'alto', 'slider', 'carrusel'],
        body: 'El slider "Altura de las fotos" controla qué tan alta se ve cada imagen (de 200px a 700px). Las fotos se recortan automáticamente para llenar ese espacio (object-fit: cover), así que siempre quedan bien sin importar el tamaño original.',
      },
      {
        title: 'Navegación manual',
        tags: ['flechas', 'puntos', 'dots', 'navegar', 'manual', 'carrusel'],
        body: 'Los visitantes pueden navegar con las flechas ◀ ▶ a los costados, o haciendo clic en los puntos de la parte inferior. El punto activo se expande para indicar en qué foto estás. Solo aparecen si hay más de una foto.',
      },
      {
        title: 'Título y subtítulo del carrusel',
        tags: ['título', 'subtítulo', 'encabezado', 'carrusel'],
        body: 'Puedes agregar un título y subtítulo opcionales que aparecen centrados arriba del carrusel. Si los dejas vacíos, el carrusel empieza directo con las fotos sin ningún encabezado.',
      },
    ],
  },
]

const COLOR_CLASSES = {
  violet: { bg: 'bg-violet-50', border: 'border-violet-200', badge: 'bg-violet-100 text-violet-700', dot: 'bg-violet-500' },
  blue:   { bg: 'bg-blue-50',   border: 'border-blue-200',   badge: 'bg-blue-100 text-blue-700',   dot: 'bg-blue-500' },
  yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', badge: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500' },
  green:  { bg: 'bg-green-50',  border: 'border-green-200',  badge: 'bg-green-100 text-green-700',  dot: 'bg-green-500' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', badge: 'bg-orange-100 text-orange-700', dot: 'bg-orange-500' },
  emerald:{ bg: 'bg-emerald-50',border: 'border-emerald-200',badge: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
  pink:   { bg: 'bg-pink-50',   border: 'border-pink-200',   badge: 'bg-pink-100 text-pink-700',   dot: 'bg-pink-500' },
  red:    { bg: 'bg-red-50',    border: 'border-red-200',    badge: 'bg-red-100 text-red-700',     dot: 'bg-red-500' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', badge: 'bg-purple-100 text-purple-700', dot: 'bg-purple-500' },
  indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', badge: 'bg-indigo-100 text-indigo-700', dot: 'bg-indigo-500' },
  teal:   { bg: 'bg-teal-50',   border: 'border-teal-200',   badge: 'bg-teal-100 text-teal-700',   dot: 'bg-teal-500' },
  gray:   { bg: 'bg-gray-50',   border: 'border-gray-200',   badge: 'bg-gray-100 text-gray-600',   dot: 'bg-gray-400' },
  sky:    { bg: 'bg-sky-50',    border: 'border-sky-200',    badge: 'bg-sky-100 text-sky-700',     dot: 'bg-sky-500' },
  slate:  { bg: 'bg-slate-50',  border: 'border-slate-200',  badge: 'bg-slate-100 text-slate-700', dot: 'bg-slate-500' },
  fuchsia:{ bg: 'bg-fuchsia-50',border: 'border-fuchsia-200',badge: 'bg-fuchsia-100 text-fuchsia-700', dot: 'bg-fuchsia-500' },
}

function highlight(text, query) {
  if (!query.trim()) return text
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  return parts.map((part, i) =>
    regex.test(part)
      ? <mark key={i} className="bg-yellow-200 text-yellow-900 rounded px-0.5">{part}</mark>
      : part
  )
}

export default function HelpPage() {
  const [query, setQuery] = useState('')
  const [openItems, setOpenItems] = useState({})

  const q = query.toLowerCase().trim()

  const filtered = useMemo(() => {
    if (!q) return MANUAL
    return MANUAL
      .map(section => ({
        ...section,
        items: section.items.filter(item =>
          item.title.toLowerCase().includes(q) ||
          item.body.toLowerCase().includes(q) ||
          item.tags.some(t => t.includes(q)) ||
          section.title.toLowerCase().includes(q)
        ),
      }))
      .filter(s => s.items.length > 0)
  }, [q])

  const totalItems = filtered.reduce((acc, s) => acc + s.items.length, 0)

  function toggleItem(sectionId, itemTitle) {
    const key = `${sectionId}__${itemTitle}`
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  function isOpen(sectionId, itemTitle) {
    const key = `${sectionId}__${itemTitle}`
    return q ? true : !!openItems[key]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gray-900 text-white px-6 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <Link to="/admin" className="text-violet-400 font-bold text-lg hover:text-violet-300 transition">
            ← Editor
          </Link>
          <span className="text-gray-600">|</span>
          <span className="text-white font-semibold">Manual de uso</span>
        </div>
        <span className="text-gray-400 text-xs hidden sm:inline">Solo visible desde el panel de administración</span>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Hero header */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">📖</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manual de uso</h1>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Todo lo que necesitas saber para editar y personalizar tu sitio web. Busca cualquier término o explora por sección.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Busca: animación, colores, whatsapp, fuente, publicar..."
            className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-10 py-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent"
            autoFocus
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Results count when searching */}
        {q && (
          <p className="text-sm text-gray-500 mb-6">
            {totalItems === 0
              ? 'No se encontraron resultados para "' + query + '"'
              : `${totalItems} resultado${totalItems !== 1 ? 's' : ''} para "${query}"`
            }
          </p>
        )}

        {/* Quick nav chips (only when not searching) */}
        {!q && (
          <div className="flex flex-wrap gap-2 mb-10">
            {MANUAL.map(section => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-violet-400 hover:text-violet-700 transition"
              >
                <span>{section.emoji}</span>
                <span>{section.title}</span>
              </a>
            ))}
          </div>
        )}

        {/* Sections */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-gray-400 text-sm">Intenta con otras palabras clave</p>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {filtered.map(section => {
              const c = COLOR_CLASSES[section.color] || COLOR_CLASSES.gray
              return (
                <section key={section.id} id={section.id}>
                  {/* Section header */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg ${c.bg} ${c.border} border`}>
                      {section.emoji}
                    </span>
                    <h2 className="text-lg font-bold text-gray-800">{section.title}</h2>
                    <span className={`ml-auto text-xs font-semibold px-2.5 py-1 rounded-full ${c.badge}`}>
                      {section.items.length}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="flex flex-col gap-2">
                    {section.items.map(item => {
                      const open = isOpen(section.id, item.title)
                      return (
                        <div
                          key={item.title}
                          className={`bg-white border rounded-xl overflow-hidden transition-all ${open ? `${c.border}` : 'border-gray-200'}`}
                        >
                          <button
                            type="button"
                            onClick={() => toggleItem(section.id, item.title)}
                            className="w-full text-left px-5 py-4 flex items-center justify-between gap-3 hover:bg-gray-50 transition"
                          >
                            <div className="flex items-center gap-3">
                              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${c.dot}`} />
                              <span className="text-sm font-semibold text-gray-800">
                                {highlight(item.title, query)}
                              </span>
                            </div>
                            <svg
                              className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
                              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          {open && (
                            <div className="px-5 pb-4 pt-0">
                              <div className={`border-t pt-3 ${c.border}`}>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                  {highlight(item.body, query)}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </section>
              )
            })}
          </div>
        )}

        <p className="text-center text-xs text-gray-300 mt-16">
          Esta página solo es visible desde el panel de administración · {MANUAL.reduce((a, s) => a + s.items.length, 0)} temas documentados
        </p>
      </div>
    </div>
  )
}
