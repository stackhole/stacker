
sudo snap install go --classic
apt install -y protobuf-compiler
go init go-curd
cd go-curd



go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.28
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.2

export PATH="$PATH:$(go env GOPATH)/bin"

export PATH="$PATH:/c/Program Files/Go/bin:/c/Users/tomma/protoc/bin"
export PATH="$PATH:/c/Users/tomma/protoc/bin"

go get -u github.com/golang/protobuf/proto
go get -u github.com/golang/protobuf/protoc-gen-go
go get -u github.com/golang/protobuf/protoc-gen-go-rpc

go get google.golang.org/protobuf
go get "google.golang.org/grpc"

export PATH="$PATH:$(go env GOPATH)/bin"



protoc --go_out=. --go-grpc_out=. --go-go_opt=paths=source_relative --go-grpc_opt=paths=source_relative curd/curd.proto

 protoc --go_opt=Mprotos/curd.proto=com.stackr.go/curd --go-grpc_opt=Mprotos/curd.proto=com.stackr.go/curd --go_out=. --go-grpc_out=.  protos/curd.proto 
