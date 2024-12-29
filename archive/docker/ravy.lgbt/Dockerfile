FROM golang:1.23

ENV GO111MODULE=on

WORKDIR /app

COPY . .

RUN go build -o lgbt-server ravy.dev/root/ravy.lgbt/server

RUN chmod +x lgbt-server

EXPOSE 7125
ENTRYPOINT ["/app/lgbt-server"]
