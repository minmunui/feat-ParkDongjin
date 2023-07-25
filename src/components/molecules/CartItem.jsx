import Counter from "../atoms/Counter";
import {comma} from "../../utils/convert";
import {RxCross2} from "react-icons/rx";
import {useContext} from "react";
import {ToastContext} from "../../App";

const CartItem = ({item, onChange}) => {
    console.log("item", item)

    const getItemAmount = () => {
        let amount = 0;
        item?.carts.forEach((cart) => {
            amount += cart.quantity
        })
        return amount;
    }

     const {showToast} = useContext(ToastContext)

    return getItemAmount() !== 0 && (
        <div className={"cart-item w-full flex flex-col box-border my-5 p-5 text-left bg-light-gray-900 "}>
            <span className={"block cart-product-name text-xl w-full break-normal"}>{item.productName}</span>
            {item.carts.map((cart) =>
                    cart.quantity !== 0 && (
                        <div
                            key={cart.id}
                            className={"cart-item pb-5 px-5 m-3 border-s-4 border-light-gray-700 flex flex-col items-end"}>
                            <button className={"del-button flex justify-end items-end"}
                                    onClick={() => onChange(cart.id, 0, -cart.quantity * cart.option.price)}
                            >
                                <RxCross2 className={"text-right"}/>
                            </button>
                            <div className={"flex flex-col w-full"}>
                                <div className="option-name flex flex-row justify-between my-2">
                                    <span>{cart.option.optionName}</span>
                                    <span>{comma(cart.option.price)}원</span>
                                </div>

                                <div className={"row flex flex-row"}>
                                    <div className="option-count w-32">
                                        <Counter
                                            value={cart.quantity}
                                            handleOnChange={(value) => {
                                                return onChange(cart.id, value, (value - cart.quantity) * cart.option.price)
                                            }}
                                            handleOnLowerBound={() => {
                                                showToast("주문 가능 수량은 1~1,000개입니다.");
                                                console.log("lower bound999");
                                            }
                                            }
                                            handleOnUpperBound={() => {
                                                showToast("주문 가능 수량은 1~1,000개입니다.");
                                                console.log("upper bound")
                                            }
                                            }
                                        />
                                    </div>
                                    <div className="option-price w-full text-right">
                                        <span>{comma(cart.option.price * cart.quantity)}원</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
            )}
            <div className={"cart-price text-right"}>
                <div className="row">
                    <h5>주문금액</h5>
                    <div className={"price font-medium"}>
                        {comma(
                            item.carts.reduce((acc, cur) => {
                                return acc + cur.option.price * cur.quantity;
                            }, 0)
                        )}원
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem;