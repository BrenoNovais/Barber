import prisma from "../../prisma/indexs";

interface FinishRequest {
    schedule_id: string
    user_id: string
}

class FinishScheduleService {
    async execute({schedule_id, user_id}: FinishRequest) {

        if ( schedule_id === "" || user_id === ""){
            throw new Error("Error");
        }

        try {
            
            const belongsToUser = await prisma.service.findFirst({
                where: {
                    id: schedule_id,
                    user_id: user_id
                }
            })

            if (!belongsToUser) {
                throw new Error("Not authorized");
            }

            await prisma.service.delete({
                where: {
                    id: schedule_id
                }
            })

            return {message: "Finalizado com sucesso!"}

        } catch (error) {
            throw new Error(error);
        }
    }
}

export default FinishScheduleService