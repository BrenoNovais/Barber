import prisma from "../../prisma/indexs";


interface HaircutRequest {
    user_id: string
    name: string
    price: number
}

class CreateHaircutService {
    async execute({user_id, name, price}: HaircutRequest) {
        
        if (!name || !price) {
            throw new Error("Error");
        }

        const myHaircuts = await prisma.haircut.count({
            where: {
                user_id: user_id
            }
        })

        const user = await prisma.user.findFirst({
            where: {
                id: user_id
            },
            include: {
                subscription: true
            }
        })

        if (myHaircuts >= 3 && user?.subscription?.status !== "active") {

            throw new Error("Not authorized")

        }

        const haircut = await prisma.haircut.create({
            data: {
                name: name,
                price: price,
                user_id: user_id
            }
        })

        return haircut
    }
}
export default CreateHaircutService 