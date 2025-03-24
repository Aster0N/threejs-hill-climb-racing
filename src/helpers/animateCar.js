export const animateCar = (player, keys) => {
  const wheels = [
    player.getObjectByName("wheel_fl"),
    player.getObjectByName("wheel_fr"),
    player.getObjectByName("wheel_rl"),
    player.getObjectByName("wheel_rr"),
  ].filter(Boolean) // filter undefine
  const steeringWheel = player.getObjectByName("steering_wheel")

  const wheelSpeed = 0.1
  const steerSpeed = 0.05
  const maxSteerAngle = Math.PI
  const maxWheelAngle = Math.PI / 4

  if (keys.a) {
    wheels[0].rotation.y = Math.min(
      wheels[0].rotation.y + wheelSpeed,
      maxWheelAngle
    )
    wheels[1].rotation.y = Math.min(
      wheels[1].rotation.y + wheelSpeed,
      maxWheelAngle
    )
  } else if (keys.d) {
    wheels[0].rotation.y = Math.max(
      wheels[0].rotation.y - wheelSpeed,
      -maxWheelAngle
    )
    wheels[1].rotation.y = Math.max(
      wheels[1].rotation.y - wheelSpeed,
      -maxWheelAngle
    )
  } else {
    wheels[0].rotation.y *= 0.9
    wheels[1].rotation.y *= 0.9
  }

  if (keys.a) {
    steeringWheel.rotation.z = Math.min(
      steeringWheel.rotation.z + steerSpeed,
      maxSteerAngle
    )
  } else if (keys.d) {
    steeringWheel.rotation.z = Math.max(
      steeringWheel.rotation.z - steerSpeed,
      -maxSteerAngle
    )
  } else {
    steeringWheel.rotation.z *= 0.9
  }
}
