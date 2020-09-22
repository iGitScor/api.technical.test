.SILENT:
.PHONY: help

# Parameters
COURIER ?= 12333
CUSTOMER ?= 23444
PARCEL ?= 34555

CAPACITY ?= 20

# Dependencies
#SHELL := /bin/zsh
NVM := $(shell command -v nvm current 2> /dev/null)

## Help
help:
	printf "${COLOR_COMMENT}Usage:${COLOR_RESET}\n"
	printf " make [target]\n\n"
	printf "${COLOR_COMMENT}Available targets:${COLOR_RESET}\n"
	awk '/^[a-zA-Z\-\_0-9\.@]+:/ { \
		helpMessage = match(lastLine, /^## (.*)/); \
		if (helpMessage) { \
			helpCommand = substr($$1, 0, index($$1, ":")); \
			helpMessage = substr(lastLine, RSTART + 3, RLENGTH); \
			printf " ${COLOR_INFO}%-16s${COLOR_RESET} %s\n", helpCommand, helpMessage; \
		} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST)

## Install project
install:
	$(call node_exec, npm install)
	docker-compose build

## Start project with Docker
start:
	docker-compose up -d --no-recreate

down:
	docker-compose down

reboot:
	$(MAKE) down
	$(MAKE) start

# Curl
# >> Courier

## Create courier (params: CAPACITY, COURIER)
create_courier:
	curl -X POST http://localhost:3000/couriers -H "Content-Type: application/json" --data '{"id": ${COURIER},"max_capacity": ${CAPACITY}}'

# >> Search

## Search couriers (params: CAPACITY)
get_courier_with_capacity:
	curl -X GET http://localhost:3000/couriers -H "Content-Type: application/json" --data '{"capacity_required": ${CAPACITY}}'

get_courier:
	curl -X GET http://localhost:3000/couriers/${COURIER} -H "Content-Type: application/json"

# >> Activity

update_capacity:
	curl -X POST http://localhost:3000/couriers/${COURIER}/capacity -H "Content-Type: application/json" --data '{"capacity": ${CAPACITY}}'

## Assign parcel to courier (params: PARCEL, COURIER)
assign_to_courier:
	curl -X POST http://localhost:3000/deliveries/${PARCEL}/handover/courier -H "Content-Type: application/json" --data '{"courier": ${COURIER}}'

## Declare parcel as deliverd (params: PARCEL, COURIER, CUSTOMER)
deliver_to_customer:
	curl -X POST http://localhost:3000/deliveries/${PARCEL}/handover/customer -H "Content-Type: application/json" --data '{"courier": ${COURIER}, "customer": ${CUSTOMER}}'



##########
# Macros #
##########

define node_exec ## Execute command inside docker node container
	docker run --rm -v $(CURDIR):/app -w /app node:14 $(1)
endef
