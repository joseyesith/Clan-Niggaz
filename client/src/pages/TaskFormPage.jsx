import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../components/ui";
import { useTasks } from "../context/tasksContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";

dayjs.extend(utc);

export function TaskFormPage() {
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const taskData = {
        ...data,
        date: dayjs.utc(data.date).format(),
        techAssistance: data.techAssistance || false,
      };

      if (params.id) {
        await updateTask(params.id, taskData);
      } else {
        await createTask(taskData);
      }

      navigate("/"); // Redirige a donde quieras después de guardar
    } catch (error) {
      console.error("Error al enviar la reserva:", error);
    }
  };

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("date", dayjs(task.date).utc().format("YYYY-MM-DD"));
        setValue("clientName", task.clientName);
        setValue("phone", task.phone);
        setValue("startTime", task.startTime);
        setValue("duration", task.duration);
        setValue("serviceType", task.serviceType);
        setValue("techAssistance", task.techAssistance);
        setValue("notes", task.notes);
      }
    };
    loadTask();
  }, []);

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-white p-10 flex items-center">
        <Card className="w-full">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Label>Título</Label>
            <Input {...register("title", { required: true })} placeholder="Título" />

            <Label>Descripción</Label>
            <Textarea {...register("description", { required: true })} placeholder="Descripción" />

            <Label>Fecha</Label>
            <Input type="date" {...register("date", { required: true })} />

            <Label>Nombre completo del cliente</Label>
            <Input {...register("clientName", { required: true })} />

            <Label>Teléfono de contacto</Label>
            <Input {...register("phone", { required: true })} />

            <Label>Hora de inicio</Label>
            <Input type="time" {...register("startTime", { required: true })} />

            <Label>Duración</Label>
            <Input {...register("duration", { required: true })} placeholder="Ej: 2 horas" />

            <Label>Tipo de servicio</Label>
            <Input {...register("serviceType", { required: true })} placeholder="Ej: grabación, mezcla..." />

            <Label className="flex items-center gap-2">
              <Input type="checkbox" {...register("techAssistance")} />
              ¿Requiere asistencia técnica?
            </Label>

            <Label>Notas adicionales</Label>
            <Textarea {...register("notes")} placeholder="Escribe cualquier detalle extra..." />

            <Button>Guardar Reserva</Button>
          </form>
        </Card>
      </div>

      <div className="w-1/2 bg-red-600 text-white flex items-center justify-center">
        <h2 className="text-3xl font-bold">Reserva tu sesión con nosotros</h2>
      </div>
    </div>
  );
}
