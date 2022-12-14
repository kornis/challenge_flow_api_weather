export const OK = (res, data = null) => {
    return res.status(200).json(
        {
            code: res.statusCode,
            data
        }
    )
}

export const FAIL = (res, message) => {
    return res.status(500).json(
        {
            code: res.statusCode,
            error: message ?? "Error interno"
        }
    )
}

export const APIERROR = (res, message, code) => {
    return res.status(code).json(
        {
            code,
            error: message ?? "Error interno"
        }
    )
}