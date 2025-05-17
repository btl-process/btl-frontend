import "./styles.css";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState, useRef } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { TypeOf } from "zod";
import { fieldsCaseSchema } from "@/schemas/fields-case.schema";
import { MenuBar } from "@/components/menu-bar";

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({}),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

// Función para generar el contenido dinámico del editor
const generateContent = (caseType: string, formData: Partial<TypeOf<typeof fieldsCaseSchema>> = {}) => {
  const currentDate = new Date();
  const accidentDate = format(formData.accidentDate || currentDate, "d 'de' MMMM 'del' yyyy", { locale: es });
  
  // Obtener datos del formulario o usar placeholders
  const name = formData.name || "xxxxxxxxxxxxxxxxxxxxxxxxx";
  const nit = formData.nit || "xxxxxxxxxxxxxxxx";
  const mail = formData.mail || "Xxxxxxxxxxxxxx";
  const formattedDate = formData.accidentDate;
  const accidentPlace = formData.accidentPlace || "xxxxxxxxxxxxxxxxxx";
  const cityAndDepartment = formData.cityAndDepartment || "xxxxxxxxxxxxxxxxxx";
  const numberPlateFirst = formData.numberPlateFirstInvolved || "xxxxxxxx";
  const nameFirstInvolved = formData.nameFirstInvolved || "xxxxxxxxxxxxxxxxxx";
  const numberPlateSecond = formData.numberPlateSecondInvolved || "xxxxxxxx";
  const nameSecondInvolved = formData.nameSecondInvolved || "xxxxxxxxxxxxxxxxxx";
  const driverVehicle = formData.driverVehicle || "xxxxxxxxxxxxxxxxxx";
  const idDriverVehicle = formData.idDriverVehicle || "xxxxxxxxxxxxxxxxxx";
  const amount = formData.amount ? `$${formData.amount.toLocaleString('es-CO')}` : "$xxxxxxxxxx";
  const insurancePolicy = formData.insurancePolicy || "xxxxxxxxxxxxxxxxxx";

  let baseContent = "";
  
  if (caseType === "RCE-DANOS") {
    baseContent = `
    <h1>RCE DAÑOS</h1>
    <p>Santiago de Cali, ${accidentDate}</p>
    <br />
    <p>Señores:</p>
    <p>${name}</p>
    <p>NIT. ${nit}</p>
    <p>CORREO: ${mail}</p>
    <p>Bogotá D.C.</p>
    <br />
    <p><strong>Referencia:</strong> Reclamación por siniestro ocurrido el ${formattedDate}</p>
    <p><strong>Lugar del accidente:</strong> ${accidentPlace}</p>
    <p><strong>Ciudad/Departamento:</strong> ${cityAndDepartment}</p>
    <p><strong>Vehículo placa:</strong> ${numberPlateFirst} de propiedad de ${nameFirstInvolved}</p>
    <p><strong>Vehículo placa:</strong> ${numberPlateSecond} de propiedad de ${nameSecondInvolved}</p>
    <p><strong>Conductor:</strong> ${driverVehicle}, CC ${idDriverVehicle}</p>
    <p><strong>Cuantía estimada:</strong> ${amount}</p>
    <p><strong>Póliza:</strong> ${insurancePolicy}</p>
    <br />
    <p>Cordial saludo,</p>
    <br />
    <p>Por medio de la presente nos permitimos informarle que hemos sido designados para atender la reclamación de la referencia.</p>
    `;
  } else if (caseType === "RCE-HURTO") {
    baseContent = `
    <h1>RCE HURTO</h1>
    <p>Santiago de Cali, ${accidentDate}</p>
    <br />
    <p>Señores:</p>
    <p>${name}</p>
    <p>NIT. ${nit}</p>
    <p>CORREO: ${mail}</p>
    <p>Bogotá D.C.</p>
    <br />
    <p><strong>Referencia:</strong> Reclamación por hurto ocurrido el ${formattedDate}</p>
    <p><strong>Lugar del incidente:</strong> ${accidentPlace}</p>
    <p><strong>Ciudad/Departamento:</strong> ${cityAndDepartment}</p>
    <p><strong>Vehículo placa:</strong> ${numberPlateFirst} de propiedad de ${nameFirstInvolved}</p>
    <p><strong>Conductor al momento del hurto:</strong> ${driverVehicle}, CC ${idDriverVehicle}</p>
    <p><strong>Cuantía estimada:</strong> ${amount}</p>
    <p><strong>Póliza:</strong> ${insurancePolicy}</p>
    <br />
    <p>Cordial saludo,</p>
    <br />
    <p>Por medio de la presente nos permitimos informarle que hemos sido designados para atender la reclamación por hurto de la referencia.</p>
    `;
  } else {
    baseContent = `
    <p>Santiago de Cali, ${accidentDate}</p>
    <br />
    <p>Señores:</p>
    <p>${name}</p>
    <p>NIT. ${nit}</p>
    <p>CORREO: ${mail}</p>
    <p>Bogotá D.C.</p>
    <br />
    `;
  }

  return baseContent;
};

interface TiptapEditorProps {
  caseType?: string;
  formData?: Partial<TypeOf<typeof fieldsCaseSchema>>;
  formSubmitted?: boolean;
  resetFormSubmitted?: () => void;
}

const TiptapEditor = ({
  caseType = "",
  formData = {},
  formSubmitted = false,
  resetFormSubmitted = () => {}
}: TiptapEditorProps) => {
  // Usar una clave única para forzar el re-renderizado del EditorProvider
  const [editorKey, setEditorKey] = useState(Date.now());
  
  // Mantener el contenido actualizado
  const generatedContent = useRef(generateContent(caseType, formData));
  
  // Actualizar el contenido cuando cambia el caseType o formData
  useEffect(() => {
    generatedContent.current = generateContent(caseType, formData);
  }, [caseType, formData]);
  
  // Cuando se envía el formulario, actualizar el contenido y forzar un re-renderizado
  useEffect(() => {
    if (formSubmitted) {
      generatedContent.current = generateContent(caseType, formData);
      setEditorKey(Date.now()); // Forzar re-renderizado del EditorProvider
      resetFormSubmitted();
    }
  }, [formSubmitted, formData, caseType, resetFormSubmitted]);

  return (
    <div className="w-full max-h-[500px] overflow-y-auto">
      <EditorProvider
        key={editorKey} // Usar una clave única para forzar re-renderizado
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={generatedContent.current}
        immediatelyRender={false}
      ></EditorProvider>
    </div>
  );
};

export default TiptapEditor;
