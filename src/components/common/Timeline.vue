<template>
    <div class="container">
        <div class="row">
            <ul class="col-12">
                <li v-for="(one, index) in timeline" :key="index" :class="[one.theme]">
                    <p></p>
                    <div></div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Timeline',
    data() {
        return {
            timeline: [
                {
                    theme: 'blue',
                    content: '注册账号',
                },
                {
                    theme: 'green',
                    content: '完善个人信息并申请签约',
                },
                {
                    theme: 'red',
                    content: '物业审核，进行施工',
                },
                {
                    theme: 'army-green',
                    content: '施工完成，享受充电服务',
                },
                {
                    theme: 'naturals',
                    content: '实时查看充电数据',
                },
            ],
        };
    },
};
</script>

<style scoped>
@import '../../assets/common';

.container {
    height: 350px;
}

ul {
    position: relative;
    height: 5px;
    background: #A9A9A9;
    list-style: none;
    margin-top: 150px;

    &::before {
        left: -10px;
    }

    &::after {
        right: -10px;
    }
}

ul::before, ul::after {
    content: '';
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: block;
    background-color: #1dd388;
    position: absolute;
    margin-top: -7.5px;
}

ul > li {
    width: 20%;
    float: left;
    height: 5px;
    position: relative;

    & p {
        background: #73BCCA;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 30px;
        height: 30px;
        margin-top: -15px;
        margin-left: -15px;
        border-radius: 50%;
        color: #fff;
        line-height: 30px;
        text-align: center;
    }

    & div {
        position: absolute;
        color: #fff;
        width: 100%;
        padding: 1rem .5rem;
    }

    & div::before {
        content: '';
        position: absolute;
        left: 50%;
        margin-left: -15px;
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
    }
}

ul > li:nth-child(odd) {
    & div {
        top: 50px;

        &::before {
            top: -19px;
            border-bottom-width: 20px;
            border-bottom-style: solid;
        }
    }
}

ul > li:nth-child(even) {
    & div {
        top: -100px;

        &::before {
            bottom: -19px;
            border-top-width: 20px;
            border-top-style: solid;
        }
    }
}

.blue {
    & p {
        background: #9fece4;
    }

    & div {
        background: #9fece4;

        &::before {
            border-top-color: #9fece4;
            border-bottom-color: #9fece4;
        }
    }
}

.green {
    & p {
        background: #afebc7;
    }

    & div {
        background: #afebc7;

        &::before {
            border-top-color: #afebc7;
            border-bottom-color: #afebc7;
        }
    }
}

.red {
    & p {
        background: #f9636f;
    }

    & div {
        background: #f9636f;

        &::before {
            border-top-color: #f9636f;
            border-bottom-color: #f9636f;
        }
    }
}

.army-green {
    & p {
        background: #ced4ae;
    }

    & div {
        background: #ced4ae;

        &::before {
            border-top-color: #ced4ae;
            border-bottom-color: #ced4ae;
        }
    }
}

.naturals {
    & p {
        background: #e6cca7;
    }

    & div {
        background: #e6cca7;

        &::before {
            border-top-color: #e6cca7;
            border-bottom-color: #e6cca7;
        }
    }
}
</style>