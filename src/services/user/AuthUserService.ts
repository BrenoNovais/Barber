import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import prisma from "../../prisma/indexs"

interface AuthUserRequest {
    email: string
    password: string
}

class AuthUserService {
    async execute({ email, password }: AuthUserRequest) {

        const user = await prisma.user.findFirst({
            where: {
                email: email
            },
            include: {
                subscription: true,
            }
        })

        if (!user) {
            throw new Error("Email incorrect")
        }

        const passwordMatch = await compare(password, user?.password)

        if (!passwordMatch) {
            throw new Error("Email/Password incorrect")
        }

        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.SECRET_KEY,
            {
                subject: user.id,
                expiresIn: "30d"
            }

        )
        return {
            id: user?.id,
            name: user?.name,
            email: user?.email,
            endereco: user?.endereco,
            token: token,
            subscriptions: user.subscription ? {
                id: user?.subscription?.id,
                status: user?.subscription.status
            } : null
        }
    }
}

export default AuthUserService