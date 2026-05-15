-- Listenfree SDK error

local ListenfreeError = {}
ListenfreeError.__index = ListenfreeError


function ListenfreeError.new(code, msg, ctx)
  local self = setmetatable({}, ListenfreeError)
  self.is_sdk_error = true
  self.sdk = "Listenfree"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function ListenfreeError:error()
  return self.msg
end


function ListenfreeError:__tostring()
  return self.msg
end


return ListenfreeError
