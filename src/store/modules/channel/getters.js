import { sumBy } from 'lodash';
export default {
    getChannelList(state){
        return state.channels
    },
    getCartList(state){
        return state.channels.filter(e => e.isCart === true)
    },
    getCartChannelsCost(state){
        const cart = state.channels.filter(e => e.isCart === true);
        const payChannels = sumBy(cart, 'price');
        let localBoucquetsData = JSON.parse(localStorage.getItem("SelectedBoucquets"));
        state.cartCost[1].price = payChannels.toFixed(2); // No. of Pay Channels
        state.cartCost[1].qty = cart.length // No. of Pay Channels
        state.cartCost[2].qty = localBoucquetsData.length // No. of bouquet 
        state.cartCost[2].price = sumBy(localBoucquetsData,"price") // total of bouquets
        state.cartCost[3].price = (0 + state.cartCost[1].price); // Total No. of unique Channels
        state.cartCost[3].qty = (25 + cart.length); // Total No. of unique Channels
        state.cartCost[4].price = (payChannels + 0) // Price(Channel+Bouquet)
        state.cartCost[4].qty = null // (25 + cart.length); // Price(Channel+Bouquet)
        state.cartCost[5].price = 130 // Network Capacity Fees
        state.cartCost[6].price = (((state.cartCost[2].price+state.cartCost[5].price+state.cartCost[4].price)*18)/100);
        state.cartCost[7].price = state.cartCost[2].price + state.cartCost[6].price + state.cartCost[5].price + state.cartCost[4].price;
        return state.cartCost;
    }
}