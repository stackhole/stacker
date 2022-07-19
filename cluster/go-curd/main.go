package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net"
	
	"google.golang.org/grpc"
	pb "com.stackr.go/curd"
)

var (
	port = flag.Int("port", 3000, "The server port")
)


type server struct {
	pb.UnimplementedCurdServiceServer
}

func (s *server) CreateCurd(ctx context.Context, in *pb.CreateCurdReq) (*pb.CreateCurdRes, error) {
	log.Printf("Received Create Curd: %v", in.GetCurd().GetId())
	return &pb.CreateCurdRes{Curd: &pb.Curd{Id:in.GetCurd().GetId()}}, nil
}

func (s *server) ReadCurd(ctx context.Context, in *pb.ReadCurdReq) (*pb.ReadCurdRes, error) {
	log.Printf("Received Read Curd: %v", in.GetId())
	return &pb.ReadCurdRes{Curd: &pb.Curd{Id:in.GetId()}}, nil
}

func (s *server) DeleteCurd(ctx context.Context, in *pb.DeleteCurdReq) (*pb.DeleteCurdRes, error) {
	log.Printf("Received Delete Curd: %v", in.GetId())
	return &pb.DeleteCurdRes{Success: true}, nil
}

func (s *server) UpdateCurd(ctx context.Context, in *pb.UpdateCurdReq) (*pb.UpdateCurdRes, error) {
	log.Printf("Received Update Curd: %v", in.GetCurd())
	return &pb.UpdateCurdRes{Curd: &pb.Curd{Id:in.GetCurd().GetId()}}, nil
}

func (s *server) ListCurds(in *pb.ListCurdsReq, stream pb.CurdService_ListCurdsServer) error {
	log.Printf("Received List Curds")
	stream.Send(&pb.ListCurdsRes{
		Curd: &pb.Curd{
			Id:  "A",
		},
	})
	return nil
}

func main() {
	flag.Parse()
	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", *port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterCurdServiceServer(s, &server{})
	log.Printf("server listening at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}