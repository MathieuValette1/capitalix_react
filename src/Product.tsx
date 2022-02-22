import { Services } from "./service"
import { Product } from "./world"

type ProductProps = {
    prod: Product
    services: Services
}
export default function ProductComponent({ prod, services }: ProductProps) {
    return (
        <div>
            ...
        </div>
    )
}
