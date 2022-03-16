import API from "@aws-amplify/api";

export interface CustomerData {
    id: string
    email: string
    phone: string
}

export interface OrderDetailData {
    id: number;
    numberOfPax: number;
    orderDate: string;
    serviceId: string;
    status: string;
    reviewStatus: boolean;
    reservationId: string;
    reservationDttm: string;
    remarks: string;
    customer: CustomerData
}

export enum statusType {
    CANCELLED = "CANCELLED",
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED"
}

export function updateStatus(reservationId: string, status: string)  {
    return API.post("reservation", `/reservation/detail/${reservationId}/updateStatus`, {
        body: {
            status: status
        }
    });
}