import prisma from "../../prisma/indexs"

interface HaircuteRequest {
    user_id: string
    haircut_id: string
    name: string
    price: number
    status: boolean | string
}

class UpdateHaircutService {
    async execute({user_id, haircut_id, name, price, status = true}:HaircuteRequest) {
        
        const user = await prisma.user.findFirst({
            where: {
                id: user_id,
            }, include: {
                subscription: true
            }
        })

        if (user?.subscription?.status !== "active") {
            throw new Error("Not authorized!");
        }

        const haircut = await prisma.haircut.update({
            where: {
                id: haircut_id
            },
            data: {
                name: name,
                price: price,
                status: status === true ? true : false
            }
        })


        
        return haircut
    }
}

export default UpdateHaircutService