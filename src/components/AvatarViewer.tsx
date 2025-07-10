import {Canvas, Vector3} from "solid-three";
import {createSignal, onMount, createEffect} from "solid-js";
import * as THREE from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

interface AABB {
    max: Vector3;
    min: Vector3;
}

interface Camera {
    position: Vector3;
    direction: Vector3;
    fov: number;
}

interface ImageDataResponse {
    aabb: AABB;
    camera: Camera;
    mtl: string;
    obj: string;
    textures: string[]
}

function Get(hash: string) {
    for (var i = 31, t = 0; t < 38; t++)
        i ^= hash[t].charCodeAt(0);
    return `https://t${(i % 8).toString()}.rbxcdn.com/${hash}`;
}

function AvatarModel(props: { imageData: ImageDataResponse }) {
    const [model, setModel] = createSignal<THREE.Group | null>(null);

    createEffect(() => {
        if (props.imageData) {
            loadModel(props.imageData).then(setModel);
        }
    });

    const loadModel = async (data: ImageDataResponse): Promise<THREE.Group> => {
        const group = new THREE.Group();

        const mtlLoader = new MTLLoader();
        const materials = await new Promise<any>((resolve, reject) => {
            mtlLoader.load(
                data.mtl,
                resolve,
                undefined,
                reject
            );
        });

        materials.preload();

        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);

        const object = await new Promise<THREE.Group>((resolve, reject) => {
            objLoader.load(
                data.obj,
                resolve,
                undefined,
                reject
            );
        });

        const textureLoader = new THREE.TextureLoader();
        const textures = await Promise.all(
            data.textures.map(textureHash =>
                new Promise<THREE.Texture>((resolve, reject) => {
                    textureLoader.load(Get(textureHash), resolve, undefined, reject);
                })
            )
        );

        object.traverse((child) => {
            if (child instanceof THREE.Mesh && child.material) {
                if (textures.length > 0 && child.material instanceof THREE.MeshStandardMaterial) {
                    child.material.map = textures[0];
                    child.material.needsUpdate = true;
                }
            }
        });

        group.add(object);
        return group;
    };

    return model() ? <primitive object={model()} /> : null;
}

export default function AvatarViewer(Props) {
    const thumbnailEndpoint = "https://thumbnails.roblox.com/v1/users/avatar-3d?userId=" + 560599252;
    const [imageData, setImageData] = createSignal<undefined | ImageDataResponse>(undefined);

    onMount(() => {
        fetch(thumbnailEndpoint, {}).then(res => res.json()).then(data => {
            fetch(data.imageUrl).then(res => res.json()).then(imgData => {
                setImageData(imgData as ImageDataResponse);
            });
        });
    });

    return (
        <Canvas
            gl={{
                antialias: true,
            }}
            shadows
            camera={{
                position: imageData()?.camera.position as Vector3 || [0, 0, 5] as Vector3,
                fov: imageData()?.camera.fov || 75
            }}
        width={"150px"}
        height={"200px"}
        class={"bg-gradient-to-t from-base rounded-lg"}>


            {imageData() && <AvatarModel imageData={imageData()!} />}
        </Canvas>
    );
}